import { cons, isNil, List, nil } from "./lib/linked-list";

const myList = cons(1, cons(2, cons(3, cons(4, nil))));
console.log(myList);
console.log(JSON.stringify(myList, null, 2));

type ShowList = <A>(xs: List<A>) => string;
const showList: ShowList = (xs) =>
  isNil(xs)
    ? ""
    : `${xs.head}` + (isNil(xs.tail) ? "" : `, ${showList(xs.tail)}`);

console.log(showList(myList));
