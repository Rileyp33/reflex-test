export const times = (n, fxn) => [...Array(n)].map((item, i) => fxn(i))

export const formatTimerText = (time) => {
  const minutes = parseInt(time / 60)
  let seconds = time % 60
  if (seconds < 10) seconds = `0${seconds}`
  return `${minutes}:${seconds}`
}