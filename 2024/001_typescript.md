# [^](../README.md) Typescript

## Lesopname

- [hogent](TODO)
- [panopto](TODO)
- `D:/DATA/Videos/WEBSERVICES/H001_TODO.mp4`

## Wat

Jullie hebben reeds kennis gemaakt met JavaScript in het olod Web Development II. Dit hoofdstuk heeft als doel om jullie kennis van JavaScript te herhalen, te verdiepen en TypeScript te introduceren.

Laten we eens vragen aan ChatGPT wat TypeScript is:

<!-- markdownlint-disable -->
<p align="center">
  <img src="img/typescript_chatgpt.png" style="width:80%;" alt="TypeScript volgens ChatGPT">
</p>
<!-- markdownlint-enable -->

TypeScript is heel simpel gezegd: "JavaScript met types". Het is een superset van JavaScript, wat wil zeggen dat elke JavaScript code ook TypeScript code is. TypeScript voegt enkel types toe aan JavaScript. Onderstaande functie is dus perfect geldige TypeScript code:

```bash
function add(a, b) {
  return a + b;
}
```

Types geef je aan door na de naam van de variabele een dubbele punt te zetten, gevolgd door de naam van het type. Hetzelfde geldt voor het type van de returnwaarde van een functie.

Met types wordt dit dus:

```bash
function add(a: number, b: number): number {
  return a + b;
}
```

Deze types worden enkel gebruikt tijdens het schrijven van de code en worden verwijderd tijdens het uitvoeren van de code. TypeScript moet vertaald worden naar JavaScript om uitgevoerd te kunnen worden, dit wordt **transpiling** genoemd.

`Als je .ts probeert te transpilen wordt aan de hand van de settings van de transpiler bepaald welke fouten worden gegenereerd, zoals bijvoorbeeld het niet toelaten van implicit any's. Veel variatie in de config is mogelijk, zie verderop.`

TypeScript is ontwikkeld door Microsoft en is open-source. Het is een populaire taal in de wereld van web development (zie <https://2023.stateofjs.com/en-US/usage/#js_ts_balance>). TypeScript wordt tegenwoordig meer gebruikt dan pure JavaScript omwille van de types, ES6+ features en soms OO features (als je hiervan houdt). Natuurlijk maakt TypeScript code soms complexer en langer, maar dit weegt niet op tegen de voordelen.

Het vervolg van dit hoofdstuk zal bestaan uit een herhaling van JavaScript en een introductie tot TypeScript. We zullen de belangrijkste basisconcepten en -mogelijkheden van TypeScript overlopen. Daarnaast zullen we ook enkele belangrijke concepten van functioneel programmeren in JavaScript/TypeScript overlopen.

Een volledig overzicht van de mogelijkheden van TypeScript kan je vinden in de [TypeScript Handbook](https://www.typescriptlang.org/docs/handbook/intro.html).

## Types

TypeScript kent een aantal basistypes:

- **number**
- **string**
- **boolean**
- **null**
- **undefined**
- **...**

Met enkel speciale:

- **void**: geeft niets terug (**null** of **undefined** zijn dan wel weer mogelijk)
- **any**: eender welke waarde, van eender welk type (niet aanbevolen)
- **never**: geeft nooit iets terug
  - bij **void** kan je nog **return;** doen, bij **never** niet

```bash
function testVreemd(): void {
  return;
}

function test(): never {
  return; // <-- compile error
}
```

```bash
PS C:\DATA\GIT\WEBSERVICES\webservices-cursus\src> yarn tsc .\001_b_typeerror.ts
yarn run v1.22.22
$ C:\DATA\GIT\WEBSERVICES\webservices-cursus\src\node_modules\.bin\tsc .\001_b_typeerror.ts
001_b_typeerror.ts:6:3 - error TS2322: Type 'undefined' is not assignable to type 'never'.

6   return; // <-- compile error
    ~~~~~~


Found 1 error in 001_a_typeerror.ts:6

error Command failed with exit code 2.
info Visit https://yarnpkg.com/en/docs/cli/run for documentation about this command.
```

Er zijn ook enkele types voor de OO-mensen onder ons:

- **class**
- **interface**
- **enum**
- **type** (minst OO van allemaal)

**interface** en **type** zijn het meest nuttig om te onthouden. Ze lijken op elkaar, maar hebben enkele verschillen: <https://react-typescript-cheatsheet.netlify.app/docs/basic/getting-started/basic_type_example#useful-table-for-types-vs-interfaces>

Een goeie regel is: gebruik een interface tot je een type nodig hebt (bron: [orta](https://x.com/orta/status/1356129195835973632?s=20))

## var, let, const

In TypeScript kan je variabelen declareren met **var**, **let** of **const**. **let** en **const** zijn block-scoped, **var** is function-scoped. Dit wil zeggen dat een **var**-variabele overal in de functie beschikbaar is, terwijl een **let**-variabele enkel beschikbaar is in het blok waarin ze gedeclareerd is (bv. binnen een **if** statement).

Waar is de variabele **value** beschikbaar in onderstaande code?

```bash
function getValue() {
  // 1
  if (condition) {
    var value = 'yes';
    // 2
    return value;
  } else {
    // 3
    return null;
  }
  // 4
}
```

Antwoord

>> **value** is beschikbaar in de hele functie, dus op de plaatsen 1, 2, 3 en 4. Dit wordt **hoisting** genoemd.

```bash
PS C:\DATA\GIT\WEBSERVICES\webservices-cursus\src> yarn tsx .\001_c_hoisting.ts 
yarn run v1.22.22
$ C:\DATA\GIT\WEBSERVICES\webservices-cursus\src\node_modules\.bin\tsx .\001_c_hoisting.ts
1: undefined
2: yes
4: yes
1: undefined
3: undefined
4: undefined
Done in 0.70s.
```

Het wordt aangeraden om **let** en **const** te gebruiken, omdat dit de scope van de variabele beperkt tot het blok waarin ze gedeclareerd is. **let** wordt gebruikt voor variabelen die van waarde kunnen veranderen, **const** voor variabelen die een constante waarde hebben.

Welke waarde zal er geprint worden in onderstaande code?

```bash
function getValueWithVar() {
  var value = 5;
  if (true) {
    var value = 6;
  }
  console.log(`In getValueWithVar: ${value}`);
}

function getValueWithLet() {
  let value = 5;
  if (true) {
    let value = 6;
  }
  console.log(`In getValueWithLet: ${value}`);
}

getValueWithVar();
getValueWithLet();
```

```bash
PS C:\DATA\GIT\WEBSERVICES\webservices-cursus\src> yarn tsx .\001_d_varletconst.ts
yarn run v1.22.22
$ C:\DATA\GIT\WEBSERVICES\webservices-cursus\src\node_modules\.bin\tsx .\001_d_varletconst.ts
In getValueWithVar: 6
In getValueWithLet: 5
Done in 0.91s.
```

## Type inference

Het is niet altijd verplicht om elke variabele, functie... te voorzien van een type. TypeScript is slim genoeg om het type af te leiden uit de context, dit heet **type inference**. Met het keyword **typeof** kan je het type van een variabele opvragen, maar dat geeft niet altijd nuttige info (zie variabele **f** hieronder).

```bash
let a = 1;
let b = 'hello';
let c = true;
let d = null;
let e = undefined;
let f = [1, 2, 3];
let g = { a: 1, b: 2, c: 3 };

console.log('Type of a:', typeof a); // number
console.log('Type of b:', typeof b); // string
console.log('Type of c:', typeof c); // boolean
console.log('Type of d:', typeof d); // object - nja, null is niet echt een object
console.log('Type of e:', typeof e); // undefined
console.log('Type of f:', typeof f); // object - eigenlijk is dit number[]
console.log('Type of g:', typeof g); // object - eigenlijk willen we hier ook een mooier type
```

```bash
PS C:\DATA\GIT\WEBSERVICES\webservices-cursus\src> yarn tsx .\001_e_types.ts
yarn run v1.22.22
$ C:\DATA\GIT\WEBSERVICES\webservices-cursus\src\node_modules\.bin\tsx .\001_e_types.ts
Type of a: number
Type of b: string
Type of c: boolean
Type of d: object
Type of e: undefined
Type of f: object
Type of g: object
Type of g.a: number
Done in 0.61s.
```

Een andere waarde toekennen aan een variabele is ook een vorm van type inference. TypeScript laat hierbij niet toe dat je een waarde toekent die niet overeenkomt met het type van de variabele. Afhankelijk van de instellingen van de compiler zal dit een fout of een waarschuwing geven.

```bash
a = 'test';

console.log('Type of a:', typeof a); // string
```

Je zou ook types kunnen toekennen aan de variabelen door gebruik te maken van de **:** operator. Dit is niet verplicht, maar kan wel handig zijn om de code leesbaarder te maken.

```bash
let getal: number = 1;
let tekst: string = 'hello';
// ...
```

Het is wel mogelijk om een variable meerdere types te laten aannemen. Dit kan door een **|** te gebruiken tussen de types.

```bash
let getalOfTekst: number | string = 1;

// en dan later:
getalOfTekst = 'hello';
```

Je kan het zelfs nog wat complexer maken:

```bash
let x = [1, 'hello', null];
// het type van x is (number | string | null)[]
```

`type van x blijkt 'object' te zijn`

In de documentatie van TypeScript kan je ook lezen dat type inference in de omgekeerde richting ook werkt, dit heet **contextual typing**. Zie hiervoor <https://www.typescriptlang.org/docs/handbook/type-inference.html#contextual-typing>

Je kan ook gedetailleerde types maken voor bijvoorbeeld objecten. Dit kan door gebruik te maken van de **{}** operator. Je kan hiervoor ook een **type alias** maken door gebruik te maken van het **type** keyword.

```bash
const obj1: { a: number; b: string } = { a: 1, b: 'hello' };

// of
type MyObject = { a: number; b: string }; // of een interface
const obj2: MyObject = { a: 1, b: 'hello' };
```

Er zijn ook programmeurs die meer houden van een OO-aanpak. Daarvoor voorziet TypeScript ook een aantal keywords:

- **class**: om een klasse te maken
- **interface**: om een interface te maken
- **enum**: om een enum te maken

```bash
enum Kleur {
  Rood,
  Groen,
  Blauw,
}

interface Kaart {
  naam: string;
  kleur: Kleur;
}

class Persoon {
  naam: string;

  constructor(naam: string) {
    this.naam = naam;
  }
}

// of korter:
class Persoon2 {
  constructor(public naam: string) {}
}
```

De OO features van TypeScript worden intensief gebruikt in bv. Angular, een front-end framework. In de olods Web Services en Front-end Web Development zal er echter enkel gebruik gemaakt worden van interfaces.

Je kan hier dus ook keywords als **extends** en **implements** gebruiken om respectievelijk te erven van een klasse/interface of een interface te implementeren.

Je kan aan de constructor van een klasse **private**, **public**, **protected** argumenten meegeven. Dit is syntactic sugar voor het aanmaken van properties met dezelfde naam en het toekennen van de argumenten aan de properties (zie **Persoon2** hierboven).

## Complexe types

Uiteraard zijn er meer dan alleen de basis types die we in de vorige sectie hebben gezien. In deze sectie gaan we kijken naar de complexere types die TypeScript kent.

> Onderstaande operators kunnen vaak werken met interfaces als argument, maar ze retourneren nadien een type.

### Intersection types

Om types te combineren moet je gebruik maken van de **&** operator, dit heet **intersection types**. De types worden hierbij samengevoegd tot één type. Het is hierbij verplicht dat variabelen van dit type aan alle types voldoen, m.a.w. het moet alle properties uit de types bevatten.

```bash
type Book = {
  title: string;
  author: string;
};

type BookExtension = Book & { isbn: string };
const book: BookExtension = {
  title: 'Introducing MLOps',
  author: 'Mark Treveil & the Dataiku Team',
  isbn: '9781492083290',
};
```

### Union types

Je kan ook types combineren met de **|** operator, dit heet **union types**. De types worden hierbij niet samengevoegd, het is ofwel het ene ofwel het andere type, ofwel een combinatie van beide. Het is dus niet verplicht om aan alle types te voldoen.

```bash
type Member = {
  name: string;
  age: number;
};

type Email = {
  email: string;
};

type MemberExtension = Member | Email;

const member: MemberExtension = {
  name: 'Thomas Aelbrecht',
  age: 25,
};
const member2: MemberExtension = {
  name: 'Thomas Aelbrecht',
  age: 25,
  email: 'thomas.aelbrecht@hogent.be',
};
const member3: MemberExtension = {
  email: 'thomas.aelbrecht@hogent.be',
};
```

Zet je de union operator helemaal vooraan het type, dan moet het één van de types zijn, maar niet alle types. Dit heet **discriminated unions**.

```bash
type NetworkLoadingState = {
  state: 'loading';
};
type NetworkFailedState = {
  state: 'failed';
  code: number;
};
type NetworkSuccessState = {
  state: 'success';
  response: {
    title: string;
    duration: number;
    summary: string;
  };
};
// Een van de drie, niet allemaal
type NetworkState =
  | NetworkLoadingState
  | NetworkFailedState
  | NetworkSuccessState;
```

In dit voorbeeld is het property **state** gedeeld. TypeScript kan dit property gebruiken om type inference te doen om te bepalen welk type gebruikt wordt. Zo krijg je in bv. **if** statements de juiste code completion en type checking.

## Utility types

TypeScript heeft ook heel wat [utility types](https://www.typescriptlang.org/docs/handbook/utility-types.html). Dit zijn types die je kan gebruiken om andere types te maken. De meest gebruikte utility types zijn:

- **`Partial<Type>`**: maakt een type optioneel
- **`Omit<Type, Keys>`**: verwijdert een of meerdere properties van een type
- **`Record<Keys, Types>`**: maakt een type voor een object met properties met naam volgens **Keys** en type volgens **Types**
- **`Pick<Type, Keys>`**: haalt een of meerdere properties (**Keys**) op uit een type (**Type**)
- **`...`**

```bash
type MyExample = {
  a: number;
  b: string;
};

type WithoutB = Omit<MyExample, 'b'>;
type OptionalMyExample = Partial<MyExample>;

type PersonKeys = 'firstName' | 'lastName' | 'email';
type Person = Record<PersonKeys, string>;
// is gelijk aan:
// type Person = {
//     firstName: string;
//     lastName: string;
//     email: string;
// };

type OnlyEmail = Pick<Person, 'email'>;
type FullName = Pick<Person, 'firstName' | 'lastName'>;
```

TypeScript heeft nog ontzettend veel mogelijkheden om types te manipuleren, maar dit valt buiten de scope van deze cursus. Je kan alles vinden in de [TypeScript Handbook](https://www.typescriptlang.org/docs/handbook/2/types-from-types.html).

## Functioneel programmeren

Functies zijn first-class citizens in JavaScript. Dit wil zeggen dat je functies kan doorgeven als argument aan een andere functie, kan teruggeven als resultaat van een functie en kan opslaan in een variabele.

Tot nu toe heb je enkel object-georiënteerd geprogrammeerd. Dit is een totaal andere manier van programmeren. In object-georiënteerd programmeren staat een object centraal. Dit object heeft een aantal eigenschappen en methodes. In functioneel programmeren staat een functie centraal. Deze functie heeft een aantal argumenten en een resultaat. In vergelijking met OO programmeren, draait functioneel programmeren meer rond wat je wil doen en niet hoe je het wil doen.

JavaScript is niet helemaal functioneel. Je hebt nl. ook nog objecten en klassen, side effects (globale variabelen)... Maar je kan wel functioneel programmeren in JavaScript. In de olods Web Services en Front-end Web Development zal daarom uitsluitend functioneel geprogrammeerd worden. Je bent natuurlijk vrij om klassen te gebruiken, maar dit zal niet de focus van deze olods zijn.

De belangrijkste onderdelen van JavaScript om functioneel te programmeren zijn:

- functies als first-class citizens
- recursie
- arrow functies
- closures
- currying
- spread operator (en destructuring)

Hieronder zullen we deze onderdelen bespreken in JavaScript, maar je kan deze ook in TypeScript gebruiken.

### Functies als first-class citizens

Je kan in JavaScript op twee manieren een functie definiëren. De eerste functie gebruikt het keyword `function`, de tweede functie wordt een **arrow function** genoemd. Je kan beide functies uitvoeren en het resultaat opslaan in een variabele:

```js
function f(a) {
  return a * 2;
}

const g = (a) => {
  return a * 2;
};

const x = f(4);
const y = g(5);
console.log(x); // x = 8
console.log(y); // y = 10
```

> Output:

```bash
8
10
```

Functies gedragen zich erg als objecten. Telkens een functie nodig is (omdat ze uitgevoerd wordt, of omdat ze aan een variabele toegewezen wordt) wordt er geheugen gealloceerd en een nieuw functie object toegewezen. Twee functies die er exact hetzelfde uitzien, zijn dus niet hetzelfde object:

```js
const g = (a) => {
  return a * 2;
};

const h = (a) => {
  return a * 2;
};
console.log(g === h);
```

> Output:

```basg
false
```

Daarnaast is het ook mogelijk om functies door te geven als argument aan een andere functie:

```js
function greet(name, greetingFn) {
  console.log(greetingFn(name));
}

function sayHello(name) {
  return 'Hello ' + name + '!';
}

greet('John', sayHello);

// of meteen inline:
greet('John', function sayGoodbye(name) {
  return 'Goodbye ' + name + '!';
});
```

> Output:

```bash
"Hello John!"
"Goodbye John!"
```

### Recursie

Recursie kennen we al: een functie roept zichzelf aan tot we in een of meerdere basisgevallen uitkomen. In JavaScript is het ook mogelijk om recursie te gebruiken. Laten we het typische voorbeeld van faculteit nemen als demonstratie:

```js
function faculteit(n) {
  if (n === 0) {
    return 1;
  }

  return n * faculteit(n - 1);
}

console.log(faculteit(5));
```

> Output:

```bash
120
```

Met recursie kan je alles doen wat je met `while`- en `for`-lussen kan doen. Dat wil niet zeggen dat je nu alles met recursie moet doen, het is niet altijd de meest efficiënte oplossing. Maar het is wel een krachtig concept dat je zeker moet kennen.

### Closures

Een closure is een functie die een andere functie teruggeeft. De teruggegeven functie heeft toegang tot de lokale variabelen van de functie waarin ze gedefinieerd is. Dit is een krachtig concept dat je toelaat om bepaalde zaken te verbergen voor de buitenwereld, je zou het bijna kunnen vergelijken met private attributen in een klassen.

Laten we een voorbeeld bekijken:

```js
function createCounter() {
  let count = 0;
  return () => {
    count++;
    return count;
  };
}

const counter = createCounter();
console.log(counter());
console.log(counter());
console.log(counter());
```

> Output:

```bash
1
2
3
```

Deze functie definieert een variabele `count` gelijk aan nul. Vervolgens geeft er een functie terug die dit getal verhoogt en teruggeeft. We kunnen de functie blijven aanroepen en krijgen telkens een hoger getal terug. Merk dus op dat de functie `counter` nog steeds toegang heeft tot de variabele `count`, ook al is de functie `createCounter` al lang uitgevoerd.

### Currying

Functies die een andere functie teruggeven worden vaak gebruikt en kunnen nuttig zijn. Soms weet je bepaalde argumenten nog niet op voorhand en wil je die later nog kunnen invullen. Dit kan met currying. Currying is een techniek waarbij je een functie kan aanroepen met een deel van de argumenten. De functie geeft dan een nieuwe functie terug die je kan aanroepen met de rest van de argumenten.

Laten we een voorbeeld bekijken:

```js
// we maken een functie die een functie teruggeeft
// deze functie vermenigvuldigt een getal met een ander getal dat we reeds hebben meegegeven
const multiplier = (a) => {
  return (b) => {
    return a * b;
  };
};

const double = multiplier(2);
const times5 = multiplier(5);

console.log(double(4));
console.log(times5(4));

// je kan ook meteen de functie aanroepen
console.log(multiplier(2)(4));
console.log(multiplier(5)(4));
```

> Output:

```bash
8
20
8
20
```

### Arrow function

We hebben reeds gezien dat we functies op twee manieren kunnen definiëren. Een van die manieren is een arrow function. Hierbij maken we geen gebruik van het `function` keyword, maar gebruiken we een pijltje => om de functie te definiëren. De functie `faculteit` kunnen we dus ook als volgt definiëren:

```js
const faculteit = (n) => {
  if (n === 0) {
    return 1;
  }

  return n * faculteit(n - 1);
};

console.log(faculteit(5));
```

> Output:

```bash
120
```

Bij een arrow function is `return` niet altijd verplicht. Je kan alles in één oneliner schrijven zonder de accolades en de `return`. De arrow functie zal dan automatisch het resultaat van de expressie teruggeven:

```js
const add = (a, b) => {
  return a + b;
};

// is gelijk aan:
const add2 = (a, b) => a + b;

console.log(add(1, 2));
console.log(add2(1, 2));
```

> Output:

```bash
3
```

### Spread operator

De spread operator (`...`) is een operator die je toelaat om een expressie uit te breiden. Je kan de spread operator gebruiken om bv. een array te maken met de elementen van een andere array, een object uit te breiden met de attributen van een ander object...

Laten we een voorbeeld voor arrays bekijken:

```js
const myArray = [1, 2, 3, 4, 5];
const myArray2 = [6, 7, 8, 9, 10];

// alles in één array plaatsen:
const theArray = [...myArray, ...myArray2];
console.log(theArray);

// bekijk het verschil zonder de spread operator:
const theArray2 = [myArray, myArray2];
console.log(theArray2);
```

> Output:

```bash
[1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
[[1, 2, 3, 4, 5], [6, 7, 8, 9, 10]]
```

Met objecten kunnen we ook gebruik maken van de spread operator:

```js
const myObject = {
  name: 'John',
  age: 42,
};
const myObject2 = {
  birthday: '01-01-1970',
};

// alles in één object plaatsen:
const theObject = {
  ...myObject,
  ...myObject2,
};
console.log(theObject);

// bekijk het verschil zonder de spread operator:
const theObject2 = {
  myObject,
  myObject2,
};
console.log(theObject2);
```

> Output:

```bash
Object {name: "John", age: 42, birthday: "01-01-1970"}
Object {myObject: Object {name: "John", age: 42}, myObject2: Object {birthday: "01-01-1970"}}
```

De spread operator kan ook handig zijn om argumenten door te geven aan een functie:

```js
const numbers = [1, 2, 3];
const multiply = (a, b, c) => {
  return a * b * c;
};

console.log(multiply(...numbers));
```

> Output:

```bash
6
```

### Destructuring

Destructuring is een techniek die je toelaat om een object of array te ontleden in variabelen. Je kan destructuring gebruiken om bv. een of meerdere keys uit een object te halen en deze op te slaan in variabelen. Je kan ook bv. het eerste element uit een array halen en de rest van de array opslaan in een variabele.

Laten we een voorbeeld bekijken:

```js
const address = {
  city: 'gent',
  street: 'coupure',
  number: 152,
};

// we halen de straat en het huisnummer uit het object en slaan ze op in variabelen
const { street, number } = address;

console.log(street);
console.log(number);

// je kan ook een element uit de array halen en de rest in een andere array plaatsen:
const numbers = [1, 2, 3, 4, 5];
const [first, ...rest] = numbers;
console.log(first);

// het wordt ook vaak gebruikt om één key uit een object te halen
// jammer genoeg werkt dit (nog) niet in Runkit
// (je zal een error krijgen als je onderstaande code uit commentaar haalt)
// const { city, ...addressWithoutCity } = address;

// console.log(city);
// console.log(addressWithoutCity);
```

> Output:

```bash
"coupure"
152
1
```

## Asynchrone code

JavaScript is een single-threaded taal (je kan wel threads maken m.b.v. [worker threads](https://nodejs.org/api/worker_threads.html)). Dit wil zeggen dat er maar één thread is die de code uitvoert. Dit is een groot verschil met bv. Java, waar je meerdere threads kan hebben die parallel uitgevoerd worden. Dit heeft als gevolg dat JavaScript code asynchroon moet uitgevoerd worden. Als je bv. een API call doet, dan moet je wachten op het resultaat. Als je dit synchroon zou doen, dan zou de hele applicatie blokkeren tot het resultaat van de API call terug is.

In JavaScript werd/wordt dit opgelost door een callback functie mee te geven aan de functie die de API call doet. De callback functie wordt dan uitgevoerd als het resultaat van de API call terug is.

Tegenwoordig wordt er meer en meer gebruik gemaakt van Promises. Een Promise is een object dat een resultaat kan bevatten dat nu nog niet beschikbaar is. Je kan een callback functie meegeven aan de Promise die uitgevoerd wordt als het resultaat beschikbaar is. Je kan ook een callback functie meegeven die uitgevoerd wordt als er een fout optreedt. Promises hebben drie mogelijke toestanden:

- pending: het resultaat is nog niet beschikbaar
- fulfilled: het resultaat is beschikbaar
- rejected: er is een fout opgetreden

Laten we een voorbeeld met callbacks bekijken:

```js
// stel we maken een functie die na een bepaalde tijd een callback functie uitvoert
function waitFor(timeInMs, callback) {
  setTimeout(() => {
    callback();
  }, timeInMs);
}

// we kunnen deze functie als volgt gebruiken:
waitFor(1000, () => {
  console.log('Hello world!');
});
// na 1 seconde zal 'Hello world!' afgedrukt worden

// met Promises wordt dit:
function waitForPromise(timeInMs) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve();
    }, timeInMs);
  });
}

// je zal zien dat Runkit de Promise uitprint
// daarop kan je de status van de Promise volgen
waitForPromise(2000).then(() => {
  console.log('Hello world from Promise!');
});
```

> Output:

```bash
Promise 
(resolved)
Properties ViewerPromiseProperties Viewer
 Promise Prototype
 constructor: function()
 then: function()
 catch: function()
 finally: function()
[Symbol("Symbol.toStringTag")]: "Promise"
 Object Prototype
"Hello world!"
"Hello world from Promise!"
```

Je kan ook een Promise maken die een fout teruggeeft:

```js
function immediatelyFail(timeInMs) {
  return new Promise((resolve, reject) => {
    reject('Something went wrong!');
  });
}

immediatelyFail().catch((error) => {
  console.log(error);
});
```

> Output:

```bash
Promise 
(resolved)
Properties ViewerPromiseProperties Viewer
 Promise Prototype
 constructor: function()
 then: function()
 catch: function()
 finally: function()
[Symbol("Symbol.toStringTag")]: "Promise"
 Object Prototype
"Something went wrong!"
```

Callbacks leiden vaak tot **callback hel**l: je moet een callback functie meegeven aan een functie die een callback functie verwacht, die op zijn beurt een callback functie verwacht... Daarom werden in de eerste plaats Promises geïntroduceerd en later ook async/await.

Async/await zijn keywords die toelaten om asynchrone code te schrijven die er synchroon uitziet. Je kan een functie als `async` markeren. Deze functie kan dan `await` gebruiken om te wachten op het resultaat van een Promise. Je kan ook een `try/catch` blok gebruiken om fouten op te vangen. Een `async` functie geeft altijd een `Promise` terug, ook al doe je geen expliciete `return`. Met async/await los je dus het probleem van callback hell op.

We raden dus aan om altijd async/await te gebruiken. Je kan nog steeds callbacks gebruiken, maar dit is niet meer nodig.

Laten we een voorbeeld bekijken:

```js
// we maken een functie die een bepaalde REST API aanspreekt
// deze functie geeft een Promise terug aangezien ze gebruik maakt van await
async function getMeSomethingFunny() {
  // we wachten op het resultaat van de API call
  const response = await fetch('https://icanhazdadjoke.com', {
    headers: {
      Accept: 'application/json',
    },
  });
  // als we een resultaat hebben, dan zetten we het om naar JSON
  const data = await response.json();
  // we geven het resultaat terug
  // dit wordt automatisch omgezet naar een Promise
  return data.joke;
}

const joke = await getMeSomethingFunny();
console.log(joke);

// zonder await krijgen we de Promise terug die "ooit" een dad joke zal bevatten
const jokeWithoutAwait = getMeSomethingFunny();
console.log(jokeWithoutAwait);
```

> Output:

```bash
 "(node:1) ExperimentalWarning: The Fetch API is an experime…race-warnings ...` to show where the warning was created)"
"Did you know that protons have mass? I didn't even know they were catholic."
Promise 
(resolved)
PromisePromiseProperties Viewer
 "Did you hear that the police have a …f? It reads “Small medium at large.”"
```

## Array functions

JavaScript heeft een aantal handige functies die je kan gebruiken op arrays. Deze functies zijn geïnspireerd op functioneel programmeren en zijn dus erg handig om te gebruiken. We overlopen de belangrijkste functies:

- `sort`: deze functie sorteert de elementen van een array (sorteert in-place, dus je moet geen nieuwe array maken).

```js
const numbers = [5, 2, 3, 1, 4];
numbers.sort();
console.log(numbers);
```

> Output

```bash
[1, 2, 3, 4, 5]
```

- `map`: deze functie past een functie toe op elk element van een array en geeft een nieuwe array terug met de resultaten.

```js
const numbers = [5, 2, 3, 1, 4];
const doubled = numbers.map((number) => {
  return number * 2;
});
console.log(doubled);
```

> Output:

```bash
[10, 4, 6, 2, 8]
```

- `filter`: deze functie past een functie toe op elk element van een array en geeft een nieuwe array terug met de elementen die voldoen aan de functie.

```js
const numbers = [5, 2, 3, 1, 4];
const even = numbers.filter((number) => {
  return number % 2 === 0;
});
console.log(even);
```

> Output:

```bash
[2, 4]
```

- `reduce`: deze functie past een functie toe op elk element van een array en geeft één resultaat terug (je doet dus aggregatie). Het eerste argument is een functie met twee parameters: het tussenresultaat van de reduce en de huidige waarde in de array. Je geeft als tweede argument (na de functie) een startwaarde mee.

```js
const numbers = [5, 2, 3, 1, 4];
const sum = numbers.reduce((accumulator, number) => {
  return accumulator + number;
}, 0);
console.log(sum);

// reduce kan je ook gebruiken om een group by te doen
// laten we de even en oneven getallen groeperen in een array
const groupBy = numbers.reduce(
  (accumulator, number) => {
    if (number % 2 === 0) {
      accumulator.even.push(number);
    } else {
      accumulator.odd.push(number);
    }
    return accumulator;
  },
  {
    even: [],
    odd: [],
  },
);
console.log(groupBy);
```

> Output:

```bas
15
Object {even: [2, 4], odd: [5, 3, 1]}
```

- `forEach`: deze functie past een functie toe op elk element van een array en geeft niets terug. Je gebruikt deze functie dus om een side effect te hebben (bv. iets afdrukken). Deze functie wordt vaak misbruikt als je eigenlijk map wil gebruiken.

```js
const numbers = [5, 2, 3, 1, 4];
numbers.forEach((number) => {
  console.log(number);
});

// misbruik terwijl je eigenlijk map wil gebruiken:
const doubled = [];
numbers.forEach((number) => {
  doubled.push(number * 2);
});
console.log(doubled);
```

> Output

```bash
5
2
3
1
4
[10, 4, 6, 2, 8]
```

- `find`: deze functie past een functie toe op elk element van een array en geeft het eerste element terug dat voldoet aan de functie. Als er geen element voldoet aan de functie, dan geeft de functie undefined terug.

```js
const numbers = [5, 2, 3, 1, 4];
const firstEven = numbers.find((number) => {
  return number % 2 === 0;
});
console.log(firstEven);
```

> Output:

```bash
2
```

- `some`: deze functie past een functie toe op elk element van een array en geeft true terug als minstens één element voldoet aan de functie.

```js
const numbers = [5, 2, 3, 1, 4];
const hasBigNumber = numbers.some((number) => {
  return number > 10;
});
console.log(hasBigNumber);
```

> Output:

```bash
false
```

- `every`: deze functie past een functie toe op elk element van een array en geeft true terug als alle elementen voldoen aan de functie.

```js
const numbers = [5, 2, 3, 1, 4];
const areSmallNumbers = numbers.every((number) => {
  return number <= 5;
});
console.log(areSmallNumbers);
```

> Output:

```bash
true
```

- `includes`: deze functie geeft true terug als een array een bepaald element bevat.

```js
const numbers = [5, 2, 3, 1, 4];
const hasThree = numbers.includes(3);
console.log(hasThree);
```

> Output:

```bash
true
```

Er komen steeds nieuwe functies bij. Je kan de volledige lijst van functies vinden op [MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array). Mogelijks zijn nieuwe functies nog niet meteen ondersteund door Node.js of door browsers. Je kan dan gebruik maken van een polyfill om de functies toch te gebruiken, bundlers (zie Front-end Web Development) kunnen hier ook bij helpen.

## Diverse handigheidjes

JavaScript heeft ook diverse kleine handigheidjes, we vullen deze lijst stelselmatig verder aan als we op iets nieuw stuiten.

### Shorthand object initializer

Bij het aanmaken van objecten moet je steeds `key: value` geven per attribuut in het object. Maar wat als de attributen (en de waarde) uit een variabele komen én de naam van het attribuut is gelijk aan de naam van de variabele? Dan kan je gebruik maken van een verkorte syntax:

```js
const name = 'John';
const age = 42;

// dit schrijven (en zien) we niet graag:
const person = {
  name: name,
  age: age,
};

// het kan korter:
const person2 = {
  name,
  age,
};

// beide bevatten hetzelfde:
console.log(person);
console.log(person2);
```

> Output:

```bash
Object {name: "John", age: 42}
Object {name: "John", age: 42}
```

## Oefeningen

### Oefening 1 - Je eigen project

Denk gedurende deze eerste les na over het onderwerp van de [examenopdracht](https://hogent-frontendweb.github.io/webservices-cursus/#/./0-intro/situering?id=wat-gaan-jullie-doen). De ervaring leert ons dat het enige tijd vergt om de leerstof van Web Services te verwerken en dat je tijdig moet beginnen aan de opdracht (maar dat is altijd, toch?).

Maak een nieuwe GitHub repository aan via de GitHub classroom link in de introductie van de Chamilo-cursus. Clone jouw GitHub repository uit de GitHub classroom:

```bash
git clone <JOUW_GIT_REPOSITORY_URL>
```

Vul alvast de `README.md` en `dossier.md` aan voor zover mogelijk:

- `README.md`:
  - Vul de titel en je naam, studentennummer en e-mailadres in.
- `dossier.md`:
  - Duid aan welk(e) vak(ken) je volgt, verwijder alles van het vak dat niet van toepassing is.
  - Vul de link(s) naar de GitHub repository/repositories in.
  - De link naar de online versie kan je nu *nog niet* invullen! Laat deze placeholder gewoon staan.

Commit vervolgens deze wijzigingen:

```bash
git add .
git commit -m "✨ Initial commit ✨"
git push
```

Schrijf in het kort neer waarover de applicatie zal gaan, welke functionaliteiten er *mogelijks* in zullen zitten, welke entiteiten er zullen zijn, welke attributen deze zullen hebben... Je doet dit bij voorkeur in een Markdown-bestand (nee, we gebruiken Word niet meer hiervoor). Door in tekstvorm te werken, kan je dit bestand bijhouden in jouw eigen GitHub repository.

Vraag hulp/feedback aan je lector als je onzeker bent over je idee. Je kan dit doen tijdens de les of na de les via een issue op jouw GitHub repository (gebruik het template voor feedback).

### Oefening 2 - TypeScript

Probeer om zoveel mogelijk TypeScript oefeningen te maken vanop deze website: <https://exercism.org/tracks/typescript>. Meld aan met behulp van je GitHub account. Klik vervolgens op `Join the TypeScript Track` en kies ervoor om de online editor te gebruiken. Je kan ook de CLI installeren en de oefeningen lokaal maken, maar dat laten we even achterwege voor deze eerste les.

Als je al ervaring hebt met TypeScript, kan je de oefeningen op deze website proberen: <https://typescript-exercises.github.io/>. Deze oefeningen zijn al iets geavanceerder, probeer m.b.v. de documentatie onderaan elke oefening de oplossing te vinden.

### Oefening 3 - JS drills

Vervolgens loont het de moeite om een aantal JavaScript drill-oefeningen te maken. Tijdens dit olod leer je heel wat nieuws in Node.js, we kunnen niet blijven stilstaan bij basis JavaScript-syntax en -functionaliteiten.

Clone de repository <https://github.com/HOGENT-frontendweb/webservices-ch1-exercise> en lees de instructies in de README. De oplossingen zijn te vinden op de branch [solution](https://github.com/HOGENT-frontendweb/webservices-ch1-exercise/tree/solution).

## Must read/watch

- [Statements vs. expressions](https://www.joshwcomeau.com/javascript/statements-vs-expressions/)
- [100+ JavaScript Concepts you Need to Know (Fireship)](https://www.youtube.com/watch?v=lkIFF4maKMU)
- [JavaScript for the Haters (Fireship)](https://www.youtube.com/watch?v=aXOChLn5ZdQ)
- [JS Is Weird](https://jsisweird.com/)

Laatste aanpassing op 29/10/2024 22:33
