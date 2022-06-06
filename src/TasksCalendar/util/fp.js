/* ********************************************************* */
/* ************************* Basic ************************* */
/* ********************************************************* */

// compose :: ((y -> z), (w -> x),  ..., (a -> b)) -> a -> z
export const compose = (...fns) => (...args) =>
  fns.reduceRight((res, fn) => [fn.call(null, ...res)], args)[0];

// pipe :: ((a -> b), (b -> c),  ..., (y -> z)) -> a -> z
export const pipe = (...fns) => (...args) =>
  fns.reduce((res, fn) => [fn.call(null, ...res)], args)[0];

// curry :: ((a, b, ...) -> c) -> a -> b -> ... -> c
export function curry(fn) {
  const arity = fn.length;

  return function $curry(...args) {
    if (args.length < arity) {
      return $curry.bind(null, ...args);
    }

    return fn.call(null, ...args);
  };
}

// map :: Functor f => (a -> b) -> f a -> f b
export const map = (fn, f) => f.map(fn);

// trace :: a -> a
export const trace = curry((tag, x) => {
  console.log(`${tag}:`, x);
  return x;
});

/* ************************************************************** */
/* ************************* Point free ************************* */
/* ************************************************************** */

// prop :: String -> a -> b;
export const prop = curry((p, obj) => obj[p]);

// length :: [a] -> Number
export const length = (xs) => xs.length;

// head :: (String | [a]) -> (String | a)
export const head = (xs) => xs[0];

// tail :: (String | [a]) -> (String | [a])
export const tail = (xs) => xs.slice(1);

// concat :: String -> String -> String
export const concat = curry((a, b) => a.concat(b));

// filter :: (a -> Boolean) -> [a] -> [a]
export const filter = curry((fn, xs) => xs.filter(fn));

// sort :: () -> [a] -> [a]
//export const sort = (xs) => xs.sort;

// find :: (a -> Boolean) -> [a] -> a
export const find = curry((fn, xs) => xs.find(fn));

// slice :: Number -> (String | [a]) -> (String | [a])
export const slice = curry((n, s) => s.slice(n));

// take :: Number -> [a] -> [a]
export const take = curry((n, xs) => xs.slice(0, n));

// dup :: a -> [a]
export const dup = (x) => [x, x];

// toString :: a -> String
export const toString = (x) => x.toString();

// toLowerCase :: String -> String
export const toLowerCase = (s) => s.toLowerCase();

// toUpperCase :: String -> String
export const toUpperCase = (s) => s.toUpperCase();

/* ********************************************************* */
/* ************************* Math ************************* */
/* ********************************************************* */

// or :: Boolean -> Boolean -> Boolean
export const or = curry((p, q) => p || q);

// xor :: Boolean -> Boolean -> Boolean
export const xor = curry((p, q) => (p && !q) || (!p && q));

// and :: Boolean -> Boolean -> Boolean
export const and = curry((p, q) => p && q);

// not :: Boolean -> Boolean
export const not = (p) => !p;

// eq :: a -> a -> Boolean
export const eq = curry((a, b) => a === b);

// neq :: a -> a -> Boolean
export const neq = curry((a, b) => a !== b);

// cmin Ord a => a -> a -> Boolean
export const cmin = curry((a) => (b) => (a < b ? a : b));

// cmax Ord a => a -> a -> Boolean
export const cmax = curry((a) => (b) => (a > b ? a : b));

// min Ord a => a -> a -> Boolean
export const min = curry((a, b) => (a < b ? a : b));

// max Ord a => a -> a -> Boolean
export const max = curry((a, b) => (a > b ? a : b));

// floor :: Number -> Number
export const floor = Math.floor;

// ceil :: Number -> Number
export const ceil = Math.ceil;

// round :: Number -> Number
export const round = Math.round;

