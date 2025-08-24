export type List<A> = Nil | Cons<A>;
interface Nil {
  _tag: "Nil";
}
interface Cons<A> {
  _tag: "Cons";
  head: A;
  tail: List<A>;
}

export const nil: List<never> = { _tag: "Nil" };
export const cons = <A>(head: A, tail: List<A>): List<A> => ({
  _tag: "Cons",
  head,
  tail,
});

export const isNil = <A>(xs: List<A>): xs is Nil => xs._tag === "Nil";
