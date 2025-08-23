import { curry2 } from "./lib/curry";

function normal_sum(a, b) {
  return a + b;
}
console.log(normal_sum(1, 2));

type Sum = (a: number) => (b: number) => number;
const sum: Sum = (a) => (b) => a + b;

console.log(sum(1)(2));

type Increment = (x: number) => number;
const increment: Increment = sum(1);

type Decrement = (x: number) => number;
const decrement: Decrement = sum(-1);

console.log(increment(6));
console.log(decrement(6));

const sum2 = curry2(normal_sum);
const increaseBy100 = sum2(100);

console.log(increaseBy100(6));
