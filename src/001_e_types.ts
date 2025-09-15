let a = 1;
let b = 'hello';
let c = true;
let d = null;
let e = undefined;
let f = [1, 2, 3]; // number[]
let g = { a: 1, b: 2, c: 3 }; // { a: number; b: number; c: number } // opgelet met copilot: ; ipv. ,

console.log('Type of a:', typeof a); // number
console.log('Type of b:', typeof b); // string
console.log('Type of c:', typeof c); // boolean
console.log('Type of d:', typeof d); // object - nja, null is niet echt een object
console.log('Type of e:', typeof e); // undefined
console.log('Type of f:', typeof f); // object - eigenlijk is dit number[]
console.log('Type of g:', typeof g); // object - eigenlijk willen we hier ook een mooier type
console.log('Type of g.a:', typeof g.a); // number