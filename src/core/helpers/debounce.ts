// Debouncer function
export function debounce<T extends (...args: any[]) => any>(func: T, delay: number) {
    let timeout: ReturnType<typeof setTimeout>;
    return function(this: ThisParameterType<T>, ...args: Parameters<T>) {
      clearTimeout(timeout);
      timeout = setTimeout(async () => {
        await func.apply(this, args);
      }, delay);
    };
  }
  