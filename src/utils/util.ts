export const delayPromise = (delay: number) =>
  new Promise((resolve) => {
    const timer = setTimeout(() => {
      resolve(delay)
      clearTimeout(timer)
    }, delay)
  })
