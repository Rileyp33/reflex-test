import React from 'react'
import {
  View,
  Dimensions,
  StyleSheet,
  Pressable,
  Image
} from 'react-native'
import { ScaledSheet } from 'react-native-size-matters'

import Wall from './Wall'
import FlipCard from './FlipCard'
import { times } from '../helpers'

const Board = ({
  activeSquares,
  activeColor,
  gameActive,
  handlePress,
  useAfter
}) => {
  const renderGameButton = (i) => {
    const containerWidth = Dimensions.get('window').width - 32
    const buttonWidth = containerWidth / 4
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
        <Wall i={i}/>
        <FlipCard
          flipped={activeSquares.includes(i) && activeColor}
          i={i}
        />
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

