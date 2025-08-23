import { compose } from "./lib/compose";
import { isNone, none, Option, some } from "./lib/option-maybe-null";

type DivideTwo = (x: number) => number;
const divideTwo: DivideTwo = (x) => 2 / x;

console.log(divideTwo(3));

type Increment = (x: number) => number;
const increment: Increment = (x) => x + 1;

const composed = compose(increment, divideTwo);
console.log(composed(8));
console.log(composed(0));

type DivideTwo2 = (x: number) => Option<number>;
const divideTwo2: DivideTwo2 = (x) => (x === 0 ? none : some(2 / x));

const composed2 = compose(
  (x: Option<number>) => (isNone(x) ? none : some(increment(x.value))),
  divideTwo2,
);
console.log(composed2(8));
console.log(composed2(0));
