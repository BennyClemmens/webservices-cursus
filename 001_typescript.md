# [^](README.md) Typescript

## Lesopname

- [hogent](TODO)
- [panopto](TODO)
- `D:/DATA/Videos/WEBSERVICES/H001_TODO.mp4`

## Wat

Jullie hebben reeds kennis gemaakt met JavaScript in het olod Web Development II. Dit hoofdstuk heeft als doel om jullie kennis van JavaScript te herhalen, te verdiepen en TypeScript te introduceren.

Laten we eens vragen aan ChatGPT wat TypeScript is:

<p align="center">
  <img src="img/typescript_chatgpt.png" style="width:50%;" alt="TypeScript volgens ChatGPT">
</p>

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

Het wordt aangeraden om **let** en **const** te gebruiken, omdat dit de scope van de variabele beperkt tot het blok waarin ze gedeclareerd is. **let** wordt gebruikt voor variabelen die van waarde kunnen veranderen, **const** voor variabelen die een constante waarde hebben.

<!-- Welke waarde zal er geprint worden in onderstaande code? -->

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

- **Partial<Type>**: maakt een type optioneel
- **Omit<Type, Keys>**: verwijdert een of meerdere properties van een type
- **Record<Keys, Types>**: maakt een type voor een object met properties met naam volgens **Keys** en type volgens **Types**
- **Pick<Type, Keys>**: haalt een of meerdere properties (**Keys**) op uit een type (**Type**)
- **...**

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

TypeScript heeft nog ontzettend veel mogelijkheden om types te manipuleren, maar dit valt buiten de scope van deze cursus. Je kan alles vinden in de {TypeScript Handbook}(https://www.typescriptlang.org/docs/handbook/2/types-from-types.html).

## Functioneel programmeren

TODO
