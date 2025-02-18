/* Any copyright is dedicated to the Public Domain.
 * http://creativecommons.org/publicdomain/zero/1.0/ */

// Test that $_ works as expected with top-level await expressions.

"use strict";

const TEST_URI = "data:text/html;charset=utf-8,top-level await + $_";

add_task(async function() {
  // Enable await mapping.
  await pushPref("devtools.debugger.features.map-await-expression", true);

  // Run test with legacy JsTerm
  await pushPref("devtools.webconsole.jsterm.codeMirror", false);
  await performTests();
  // And then run it with the CodeMirror-powered one.
  await pushPref("devtools.webconsole.jsterm.codeMirror", true);
  await performTests();
});

async function performTests() {
  const hud = await openNewTabAndConsole(TEST_URI);
  const {jsterm} = hud;

  const executeAndWaitForResultMessage = (input, expectedOutput) =>
    executeAndWaitForMessage(hud, input, expectedOutput, ".result");

  info("Evaluate a simple expression to populate $_");
  await executeAndWaitForResultMessage(`1 + 1`, `2`);

  await executeAndWaitForResultMessage(`$_ + 1`, `3`);
  ok(true, "$_ works as expected");

  info("Check that $_ does not get replaced until the top-level await is resolved");
  const onAwaitResultMessage = executeAndWaitForResultMessage(
    `await new Promise(res => setTimeout(() => res([1,2,3, $_]), 1000))`,
    `Array(4) [ 1, 2, 3, 4 ]`
  );

  await executeAndWaitForResultMessage(`$_ + 1`, `4`);
  ok(true, "$_ was not impacted by the top-level await input");

  await onAwaitResultMessage;
  ok(true, "the top-level await result can use $_ in its returned value");

  await executeAndWaitForResultMessage(
    `await new Promise(res => setTimeout(() => res([...$_, 5]), 1000))`,
    `Array(5) [ 1, 2, 3, 4, 5 ]`
  );
  ok(true, "$_ is assigned with the result of the top-level await");

  info("Check that awaiting for a rejecting promise does not re-assign $_");
  await executeAndWaitForMessage(hud,
    `x = await new Promise((resolve,reject) =>
      setTimeout(() => reject("await-" + "rej"), 500))`,
    `await-rej`,
    `.error`
  );

  await executeAndWaitForResultMessage(
    `$_`,
    `Array(5) [ 1, 2, 3, 4, 5 ]`
  );
  ok(true, "$_ wasn't re-assigned");

  info("Check that $_ gets the value of the last resolved await expression");
  const delays = [1000, 500, 2000, 1500];
  const inputs = delays.map(delay => `await new Promise(
    r => setTimeout(() => r("await-concurrent-" + ${delay}), ${delay}))`);

  // Let's wait for the message that sould be displayed last.
  const onMessage = waitForMessage(hud, "await-concurrent-2000", ".message.result");
  for (const input of inputs) {
    jsterm.execute(input);
  }
  await onMessage;

  await executeAndWaitForResultMessage(`"result: " + $_`,
    `"result: await-concurrent-2000"`);
  ok(true, "$_ was replaced with the last resolving top-level await evaluation result");
}
