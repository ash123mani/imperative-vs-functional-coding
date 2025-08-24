export type Either<E, A> = Left<E> | Right<A>;
interface Right<A> {
  _tag: "Right";
  right: A;
}
interface Left<E> {
  _tag: "Left";
  left: E;
}

export const left = <E, A = never>(e: E): Either<E, A> => ({
  _tag: "Left",
  left: e,
});
export const right = <A, E = never>(a: A): Either<E, A> => ({
  _tag: "Right",
  right: a,
});

export const isLeft = <E, A>(x: Either<E, A>): x is Left<E> =>
  x._tag === "Left";
