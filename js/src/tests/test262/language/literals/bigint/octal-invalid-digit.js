// |reftest| skip-if(!this.hasOwnProperty('BigInt')) error:SyntaxError -- BigInt is not enabled unconditionally
// Copyright (C) 2017 Robin Templeton. All rights reserved.
// This code is governed by the BSD license found in the LICENSE file.

/*---
description: Octal BigInt literal containing an invalid digit
esid: prod-NumericLiteral
info: |
  NumericLiteral ::
    NumericLiteralBase NumericLiteralSuffix

  NumericLiteralBase ::
    DecimalLiteral
    BinaryIntegerLiteral
    OctalIntegerLiteral
    HexIntegerLiteral

  NumericLiteralSuffix :: n
negative:
  phase: parse
  type: SyntaxError
features: [BigInt]
---*/

throw "Test262: This statement should not be evaluated.";

0o9n;
