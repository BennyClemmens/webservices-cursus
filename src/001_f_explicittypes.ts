let h = 'test';

console.log('Type of h:', typeof h); // string

let getal: number = 1;
let tekst: string = 'hello';
// ...

let getalOfTekst: number | string  | undefined;
console.log('Type of getalOfTekst:', typeof getalOfTekst);

// en dan later:
getalOfTekst = 'hello';

console.log('Type of getalOfTekst:', typeof getalOfTekst); // number

let x = [1, 'hello', null];
// het type van x is (number | string | null)[]
console.log('Type of x:', typeof x); // object - eigenlijk willen we hier ook een mooier type