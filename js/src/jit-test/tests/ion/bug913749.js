y = new Float32Array(11);
x = [];

Object.defineProperty(x, 18, {
    get: (function() {
        y.length;
    }),
});
this.toSource();

y = undefined;

// The exact error message varies nondeterministically. Accept several
// variations on the theme.
var variations = [
    `y is undefined; can't access its "length" property`,
    `can't access property "length" of undefined` ,
    `undefined has no properties`,
];

var hits = 0;
for (var i = 0; i < 3; i++) {
    try {
        x.toString();
    } catch (e) {
        assertEq(e.constructor.name, 'TypeError');
        if (!variations.includes(e.message))
            throw new Error(`expected one of ${uneval(variations)}; got ${uneval(e.message)}`);
        hits++;
    }
}
assertEq(hits, 3);
