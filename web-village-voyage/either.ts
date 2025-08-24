import { compose } from "./lib/compose";
import { Either, isLeft, left, right } from "./lib/either";

function divideTwoIfEven(num: number): number {
  if (num === 0) throw "cannot divide by zero";
  else if (num % 2 !== 0) throw "number is not even";
  else return 2 / num;
}

console.log(divideTwoIfEven(8));
// console.log(divideTwoIfEven(0));
// console.log(divideTwoIfEven(3));

function divideTwoIfEven2(num: number): Either<string, number> {
  if (num === 0) return left("cannot divide by zero");
  else if (num % 2 !== 0) return left("number is not even");
  else return right(2 / num);
}
console.log(divideTwoIfEven2(8));
console.log(divideTwoIfEven2(0));
console.log(divideTwoIfEven2(3));

type Increment = (x: number) => number;
const increment: Increment = (x: number) => x + 1;

const composed = compose(
  (x) => (isLeft(x) ? x : right(increment(x.right))),
  divideTwoIfEven2,
);
console.log(composed(8));
console.log(composed(0));
console.log(composed(3));
