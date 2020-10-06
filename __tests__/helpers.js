import { formatTimerText, times } from '../src/helpers'

describe('Timer format function', () => {
  test('it should take in seconds as an integer and return a string in 0:00 format.', () => {
    const input = 113
    const output = '1:53'
    expect(formatTimerText(input)).toEqual(output)
  })
})

describe('Times function', () => {
  test('it should invoke a callback with an optional index argument once for each number passed to the first parameter', () => {
    const callbackWithIndex = i => i * 10
    const callbackWithoutIndex = () => 'test'
    const numTimes = 5
    const outputWithIndex = [0, 10, 20, 30, 40]
    expect(times(numTimes, callbackWithIndex)).toEqual(outputWithIndex)
    const outputWithoutIndex = ['test', 'test', 'test', 'test', 'test']
    expect(times(numTimes, callbackWithoutIndex)).toEqual(outputWithoutIndex)
  })
})