import { none, some } from "./lib/option-maybe-null";
import { matchEither, matchList, matchW } from "./lib/adt-and-pattern-matching";
import { left, right } from "./lib/either";
import { cons, List, nil } from "./lib/linked-list";

// Match Option
const mayBeValue = some(20);
console.log(
  matchW(
    () => "no Value",
    (x) => `num is ${x}`,
  )(mayBeValue),
);

const noneValue = none;
console.log(
  matchW(
    () => "Err: Please pass an value",
    (x) => `num is ${x}`,
  )(noneValue),
);

// Match Either
const errorOrNum = right(20);
console.log(
  matchEither(
    (e: string) => `Error happened: ${e}`,
    (a: number) => ({ a, msg: `num is ${a}` }),
  )(errorOrNum),
);

const errorOrNum2 = left(20);
console.log(
  matchEither(
    (e: number) => `Error happened: ${e}`,
    (a: number) => ({ a, msg: `num is ${a}` }),
  )(errorOrNum2),
);

// Match List
const myList: List<number> = cons(1, cons(2, cons(3, nil)));
console.log(
  matchList(
    () => "list is empty",
    (head: number, tail: List<number>) => `list head is ${head}`,
  )(myList),
);

const emptyList: List<never> = nil;
console.log(
  matchList(
    () => "list is empty",
    (head: number, tail: List<number>) => `list head is ${head}`,
  )(emptyList),
);
