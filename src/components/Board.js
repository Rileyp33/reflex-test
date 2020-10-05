import React from 'react'
import {
  View,
  TouchableOpacity,
  Dimensions,
  StyleSheet
} from 'react-native'
import { ScaledSheet } from 'react-native-size-matters'

import { times } from '../helpers'
import { colors } from '../styles'

const Board = ({ activeSquares, activeColor, gameActive, handlePress, turns }) => {
  const colorSwitch = turns % 2
  const renderGameButton = (i) => {
    const containerWidth = Dimensions.get('window').width - 32
    const buttonWidth = containerWidth / 4
    return (
      <TouchableOpacity
        key={i}
        onPress={() => handlePress(i)}
        disabled={!gameActive}
        activeOpacity={0.7}
        style={[
          styles.gameButton,
          {
            width: buttonWidth,
            height: buttonWidth,
            backgroundColor: activeSquares.includes(i) && activeColor
              ? colorSwitch
                ? colors.blue
                : colors.purple
              : 'white'
          }
        ]}
      />
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
    borderWidth: 1,
    borderColor: colors.darkGray,
    flexWrap: 'wrap',
    flexDirection: 'row'
  },
  gameButton: {
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: colors.gray
  }
})

export default Board

