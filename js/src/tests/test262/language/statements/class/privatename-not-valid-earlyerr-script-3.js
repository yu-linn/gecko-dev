// |reftest| skip error:SyntaxError -- class-fields-private,class-fields-public is not supported
// Copyright (C) 2017 Valerie Young. All rights reserved.
// This code is governed by the BSD license found in the LICENSE file.
/*---
esid: sec-scripts-static-semantics-early-errors
description: Early error when referencing privatename that has not been declared in class.
info: |
  Static Semantics: Early Errors
    ScriptBody : StatementList

    It is a Syntax Error if AllPrivateNamesValid of StatementList with an empty List as an argument is false unless the source code is eval code that is being processed by a direct eval.

features: [class, class-fields-private, class-fields-public]
negative:
  phase: parse
  type: SyntaxError
---*/

throw "Test262: This statement should not be evaluated.";

class C {
  y = this.#x;
}
