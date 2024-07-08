export const addMilliseconds = (
  milliseconds: number,
  date = new Date()
): Date => new Date(date.getTime() + milliseconds)
