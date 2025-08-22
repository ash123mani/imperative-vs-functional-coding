/**
 * A container type that represents a value with mapping capabilities (Functor).
 * Provides map and fold operations for transforming and extracting values.
 * @template T
 * @example
 * // Transform a value through multiple steps
 * const result = Box(5)
 *   .map(x => x * 2)      // Box(10)
 *   .map(x => x + 3)      // Box(13)
 *   .fold(x => x);        // 13
 *
 * // Clean and parse a string
 * const cleanNumber = str =>
 *   Box(str)
 *     .map(s => s.trim())
 *     .map(parseInt)
 *     .fold(x => x);
 */
const Box = (x) => ({
  map: (f) => Box(f(x)),
  fold: (f) => f(x),
});

/**
 * A lazy container that defers computation until fold is called.
 * Useful for building computation pipelines that execute only when needed.
 * @template T
 * @example
 * // Build a computation pipeline that executes only when folded
 * const computation = LazyBox(() => "  64  ")
 *   .map(str => str.trim())          // deferred
 *   .map(str => parseInt(str))       // deferred
 *   .map(num => num * 2);            // deferred
 *
 * const result = computation.fold(x => x); // executes: 128
 *
 * // Side effects are deferred until fold
 * const withSideEffect = LazyBox(() => {
 *   console.log("Computing...");
 *   return 42;
 * }).map(x => x * 2);
 *
 * // Nothing logged until now:
 * const value = withSideEffect.fold(x => x); // logs "Computing", returns 84
 */
const LazyBox = (g) => ({
  fold: (f) => f(g()),
  map: (f) => LazyBox(() => f(g())),
});

/**
 * Represents a successful computation in the Either monad (right side).
 * Used for error handling with functional composition.
 * @template T
 * @example
 * // Successful computation chain
 * const success = Right(10)
 *   .map(x => x * 2)          // Right(20)
 *   .map(x => x + 5)          // Right(25)
 *   .fold(
 *     error => `Error: ${error}`,
 *     value => `Success: ${value}`
 *   ); // "Success: 25"
 *
 * // Chaining operations that might fail
 * const divide = (a, b) => b === 0
 *   ? Left("Division by zero")
 *   : Right(a / b);
 *
 * const calculation = Right(20)
 *   .chain(x => divide(x, 2))  // Right(10)
 *   .chain(x => divide(x, 5)); // Right(2)
 */
const Right = (x) => ({
  chain: (f) => f(x),
  map: (f) => Right(f(x)),
  fold: (f, g) => g(x),
  inspect: () => `Right(${x})`,
});

/**
 * Represents a failed computation in the Either monad (left side).
 * Used for error handling and short-circuiting computations.
 * @template T
 * @example
 * // Error short-circuits computation
 * const failure = Left("Invalid input")
 *   .map(x => x * 2)          // Left("Invalid input") - ignored
 *   .map(x => x + 5)          // Left("Invalid input") - ignored
 *   .fold(
 *     error => `Error: ${error}`,
 *     value => `Success: ${value}`
 *   ); // "Error: Invalid input"
 *
 * // Safe function that might fail
 * const parseNumber = (str) => {
 *   const num = parseInt(str);
 *   return isNaN(num)
 *     ? Left("Not a number")
 *     : Right(num);
 * };
 *
 * const result = parseNumber("abc")
 *   .map(x => x * 2)
 *   .fold(
 *     error => `Failed: ${error}`,
 *     value => `Result: ${value}`
 *   ); // "Failed: Not a number"
 */
const Left = (x) => ({
  chain: (f) => Left(x),
  map: (f) => Left(x),
  fold: (f, g) => f(x),
  inspect: () => `Left(${x})`,
});

/**
 * A sum type representing either a successful result (Right) or an error (Left).
 * Used for functional error handling and control flow.
 * @example
 * // Validation example
 * const validateEmail = (email) =>
 *   email.includes('@')
 *     ? Right(email)
 *     : Left("Invalid email");
 *
 * const validateLength = (str) =>
 *   str.length >= 6
 *     ? Right(str)
 *     : Left("Too short");
 *
 * const processInput = (input) =>
 *   validateEmail(input)
 *     .chain(validateLength)
 *     .fold(
 *       error => `Validation failed: ${error}`,
 *       value => `Valid: ${value}`
 *     );
 *
 * processInput("test@example.com"); // "Valid: test@example.com"
 * processInput("test");            // "Validation failed: Invalid email"
 * processInput("a@b.c");           // "Validation failed: Too short"
 */
const Either = Right((x = "valid case")) || Left((x = "gives error"));
