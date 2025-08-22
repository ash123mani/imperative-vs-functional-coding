type Increment = (x: number) => number;
const increment: Increment = (x) => x + 1;

type ToString = (x: number) => string;
const tostring: ToString = (x) => `"${x}"`;

type IncrementThenToString = (x: number) => string;
const incrementThenToString: IncrementThenToString = (x) =>
  tostring(increment(x));

// prettier-ignore
type Compose = <A, B, C>(
    f: (x: B) => C,
    g: (x: A) => B
) => (x: A) => C;
const compose: Compose = (f, g) => (x) => f(g(x));

const incrementThenToString2 = compose(tostring, increment);
console.log(incrementThenToString2(30));
