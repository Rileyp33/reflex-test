import React from 'react'
import renderer from 'react-test-renderer'
import Board from '../../src/components/Board'

test('Game board renders correctly in difficulty level 1 on an odd numbered turn with the last square purple', () => {
  const tree = renderer.create(
    <Board
      activeSquares={[15]}
      activeColor={true}
      gameActive={true}
      handlePress={() => { }}
      turns={1}
    />
  ).toJSON()
  expect(tree).toMatchSnapshot()
})

test('Game board renders correctly in difficulty level 2 on an even numbered turn with the first two squares blue', () => {
  const tree = renderer.create(
    <Board
      activeSquares={[0, 1]}
      activeColor={true}
      gameActive={true}
      handlePress={() => { }}
      turns={0}
    />
  ).toJSON()
  expect(tree).toMatchSnapshot()
})

test('Game board renders correctly in difficulty level 3 on an odd numbered turn with the last three squares purple', () => {
  const tree = renderer.create(
    <Board
      activeSquares={[13, 14, 15]}
      activeColor={true}
      gameActive={true}
      handlePress={() => { }}
      turns={1}
    />
  ).toJSON()
  expect(tree).toMatchSnapshot()
})
