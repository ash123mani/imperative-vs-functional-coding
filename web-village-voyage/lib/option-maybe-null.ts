export type Option<A> = Some<A> | None;

interface Some<A> {
  _tag: "Some";
  value: A;
}
interface None {
  _tag: "None";
}

export const some = <A>(x: A): Option<A> => ({ _tag: "Some", value: x });
export const none: Option<never> = { _tag: "None" };

export const isNone = <A>(x: Option<A>): x is None => x._tag === "None";
