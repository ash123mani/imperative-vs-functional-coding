import { isNone, Option } from "./option-maybe-null";
import { Either, isLeft } from "./either";
import { isNil, List } from "./linked-list";

// ADT is algebraic data type

// Match Option
type MatchOption = <A, B, C>(
  onNone: () => B,
  onSome: (x: A) => C,
) => (x: Option<A>) => B | C;

export const matchW: MatchOption = (onNone, onSome) => (x) =>
  isNone(x) ? onNone() : onSome(x.value);

// Match Either
type MatchEither = <E, A, B, D>(
  onLeft: (x: E) => B,
  onRight: (x: A) => D,
) => (x: Either<E, A>) => B | D;

export const matchEither: MatchEither = (onLeft, onRight) => (x) =>
  isLeft(x) ? onLeft(x.left) : onRight(x.right);

// Match List
type MatchList = <A, B, C>(
  onNil: () => B,
  onCons: (head: A, tail: List<A>) => C,
) => (xs: List<A>) => B | C;
export const matchList: MatchList = (onNil, onCons) => (xs) =>
  isNil(xs) ? onNil() : onCons(xs.head, xs.tail);
