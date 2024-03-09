/**
 * Checks cache if there is a pre-computed result, 
 * if there is not, execute the provided function and store the result in cache.
 * If there is already a cached value, return that value and do not execute the function.
 * Return in provided type "T"
 */
export function memo<T>(func: () => T): () => T {
  let cache: T | undefined;
  return (): T => {
    if (cache === undefined) {
      cache = func();
    }
    return cache;
  };
}

export function asyncMemo<T>(func: () => Promise<T>): () => Promise<T> {
  let cache: T | undefined;
  return async (): Promise<T> => {
    if (cache === undefined) {
      cache = await func();
    }
    return cache;
  };
}
