// |reftest| error:SyntaxError
// This file was procedurally generated from the following sources:
// - src/dstr-binding/ary-ptrn-rest-init-obj.case
// - src/dstr-binding/default/async-gen-func-decl.template
/*---
description: Rest element (nested object pattern) does not support initializer (async generator function declaration)
esid: sec-asyncgenerator-definitions-instantiatefunctionobject
features: [async-iteration]
flags: [generated, async]
negative:
  phase: parse
  type: SyntaxError
info: |
    AsyncGeneratorDeclaration : async [no LineTerminator here] function * BindingIdentifier
        ( FormalParameters ) { AsyncGeneratorBody }

        [...]
        3. Let F be ! AsyncGeneratorFunctionCreate(Normal, FormalParameters, AsyncGeneratorBody,
            scope, strict).
        [...]


    13.3.3 Destructuring Binding Patterns
    ArrayBindingPattern[Yield] :
        [ Elisionopt BindingRestElement[?Yield]opt ]
        [ BindingElementList[?Yield] ]
        [ BindingElementList[?Yield] , Elisionopt BindingRestElement[?Yield]opt ]
---*/
throw "Test262: This statement should not be evaluated.";


var callCount = 0;
async function* f([...{ x } = []]) {
  
  callCount = callCount + 1;
};
f([]).next().then(() => {
    assert.sameValue(callCount, 1, 'invoked exactly once');
}).then($DONE, $DONE);
