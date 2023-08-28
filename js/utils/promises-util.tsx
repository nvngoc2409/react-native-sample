export const asyncPromiseDataError = <T = any,>(
  promise: Promise<T>,
): Promise<{data?: T; error?: Error}> => {
  return new Promise<{data?: T; error?: Error}>(resolve =>
    promise.then(data => resolve({data})).catch(error => resolve({error})),
  );
};

export const asyncPromiseDismissError = <T = any,>(
  promise: Promise<T>,
): Promise<T | undefined> => {
  return new Promise<T | undefined>(resolve =>
    promise.then(resolve).catch(() => resolve(undefined)),
  );
};
