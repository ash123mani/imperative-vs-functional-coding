// Given this imperative code:
// Rewrite it using a Box, map, and fold to eliminate assignment and maintain linear flow.

// function moneyToFloat(str) {
//     const replaced = str.replace('$', '');
//     return parseFloat(replaced);
// }

const moneyToFloat = (str) =>
  Box(str)
    .map((s) => s.replace("$", ""))
    .map((s) => parseFloat(s));

// Refactor this using Box to consolidate it into one composed expression.

// function percentToFloat(str) {
//     const replaced = str.replace('%', '');
//     const num = parseFloat(replaced);
//     return num * 0.01;
// }

const percentToFloat = (str) =>
  Box(str)
    .map((s) => s.replace("%", ""))
    .map((s) => parseFloat(s))
    .map((num) => num * 0.01);

// Rewrite this using nested Box containers, showing how you’d maintain both cost and discount in scope.

// function appliedDiscount(moneyStr, percentStr) {
//     const cost = moneyToFloat(moneyStr);
//     const discount = percentToFloat(percentStr);
//     return cost - (cost * discount);
// }

const appliedDiscount = (moneyStr, percentStr) =>
  moneyToFloat(moneyStr).fold((cost) =>
    percentToFloat(percentStr).fold((discount) => cost - cost * discount),
  );

const Box = (x) => ({
  map: (f) => Box(f(x)),
  // toString: () => console.log(x),
  fold: (f) => f(x),
});

console.log(moneyToFloat("$100").fold((x) => x));
console.log(percentToFloat("25%").fold((x) => x));
console.log(appliedDiscount("$100", "25%"));
