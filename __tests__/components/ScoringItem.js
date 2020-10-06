import React from 'react'
import renderer from 'react-test-renderer'
import ScoringItem from '../../src/components/ScoringItem'

test('Scoreboard item renders correctly', () => {
  const tree = renderer.create(
    <ScoringItem
      label={'Level'}
      data={1}
      containerColor={'#009FB7'}
      labelColor='white'
      dataColor='white'
      barColor='white'
    />
  ).toJSON()
  expect(tree).toMatchSnapshot()
})
