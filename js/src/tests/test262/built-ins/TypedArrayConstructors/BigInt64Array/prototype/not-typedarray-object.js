// |reftest| skip-if(!this.hasOwnProperty('BigInt')) -- BigInt is not enabled unconditionally
// Copyright (C) 2017 Igalia, S.L. All rights reserved.
// This code is governed by the BSD license found in the LICENSE file.

/*---
esid: sec-properties-of-typedarray-prototype-objects
description: BigInt64Array.prototype is not a TypedArray instance
info: |
  22.2.6 Properties of TypedArray Prototype Objects

  [...] A TypedArray prototype object is an ordinary object. It does not
  have a [[ViewedArrayBuffer]] or any other of the internal slots that
  are specific to TypedArray instance objects.
features: [BigInt]
---*/

assert.throws(TypeError, function () {
  BigInt64Array.prototype.buffer;
});

reportCompare(0, 0);
