// |reftest| skip error:SyntaxError -- class-static-fields-private is not supported
// This file was procedurally generated from the following sources:
// - src/class-elements/grammar-static-privatename-constructor.case
// - src/class-elements/syntax/invalid/cls-decl-elements-invalid-syntax.template
/*---
description: Static Private Fields cannot be named constructor (class declaration)
esid: prod-ClassElement
features: [class-static-fields-private, class]
flags: [generated]
negative:
  phase: parse
  type: SyntaxError
info: |
    Class Definitions / Static Semantics: Early Errors

    ClassElementName : PrivateName ;
        It is a Syntax Error if StringValue of PrivateName is "#constructor"

---*/


throw "Test262: This statement should not be evaluated.";

class C {
  static #constructor
}
