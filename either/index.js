// Part A: Implement safeProp Function
// Create a function safeProp(propName, obj) that returns an Either:
// 	If the property propName exists on the object obj (and is not null or undefined), return Right(obj[propName]).
// 	Otherwise, return Left('Property <propName> not found'), where <propName> is the actual property name.
// 	Use a fromNullable-like helper to wrap the property access, or implement the logic manually.
// 	Part B: Compose with .map() and .fold()
// Chain operations using .map() and .fold():
// Access a nested property—for example, user.profile.name—handling missing parts gracefully.
// Use .map() to transform the final name (e.g., name.toUpperCase()).
// Use .fold() to return:
// If any property in the chain is missing: "Property missing".
// 	If successful: the transformed value (uppercase name).

const user = { profile: { name: null } };

const Right = (x) => ({
  chain: (f) => f(x),
  map: (f) => Right(f(x)),
  fold: (f, g) => g(x),
});

const Left = (x) => ({
  chain: (f) => Left(x),
  map: () => Left(x),
  fold: (f, g) => f(x),
});

const tryCatch = (f) => {
  try {
    return Right(f());
  } catch (e) {
    return Left(e);
  }
};

const fromNullable = (found, key) => (found ? Right(found) : Left(key));

const safeProp = (key, property) =>
  key.split(".").reduce((obj, key) => obj[key], property);

const result = tryCatch(() => safeProp("profile.name", user))
  .chain((name) => tryCatch(() => name.toUpperCase()))
  .fold(
    (e) => (typeof e === "string" ? `${key} not found` : e.message),
    (name) => name,
  );

console.log(result);
