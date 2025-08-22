const LazyBox = (g) => ({
  // g = () => "  64 "
  fold: (f) => f(g()),
  map: (f) => LazyBox(() => f(g())), // LazyBox(() => f(" 64 "))
});

const result = LazyBox(() => "  64 ")
  .map((abba) => abba.trim())
  .map((trimmed) => new Number(trimmed))
  .map((number) => number + 1)
  .map((x) => String.fromCharCode(x))
  .map(() => console.log("final"));
// .fold((x) => x.toLowerCase());

console.log(result);
