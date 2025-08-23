// prettier-ignore
export type Curry2 = <A, B, Z>(f: (a: A, b: B) => Z)
    => (a: A)
    => (b: B)
    => Z;

export const curry2: Curry2 = (f) => (a) => (b) => f(a, b);
