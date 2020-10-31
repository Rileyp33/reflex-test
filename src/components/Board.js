import React from 'react'
import {
  View,
  Dimensions,
  Pressable
} from 'react-native'
import { ScaledSheet } from 'react-native-size-matters'

import Card from './Card'
import { times } from '../helpers'

const Board = ({
  activeSquares,
  activeColor,
  gameActive,
  handlePress,
  interval
}) => {
  const renderGameButton = (i) => {
    const containerWidth = Dimensions.get('window').width - 32
    const buttonWidth = containerWidth / 4
    const isActive = activeSquares.includes(i)
    return (
      <Pressable
        key={i}
        onPressIn={() => handlePress(i)}
        disabled={!gameActive}
        style={{
          width: buttonWidth,
          height: buttonWidth,
        }}
      >
        {({ pressed }) => (
          <Card
            flipped={isActive && activeColor}
            isActive={isActive}
            i={i}
            interval={interval}
            pressed={pressed}
          />
        )}
      </Pressable>
    )
  }

  return (
    <View style={styles.boardContainer}>
      {times(16, renderGameButton)}
    </View>
  )
}

const styles = ScaledSheet.create({
  boardContainer: {
    flexWrap: 'wrap',
    flexDirection: 'row'
  },
  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover'
  }
})

export default Board

