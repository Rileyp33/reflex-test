import React from 'react'
import { View, Text, TouchableOpacity } from 'react-native'
import { ScaledSheet } from 'react-native-size-matters'

import { colors } from '../styles'

const Button = ({ gameActive, pauseTimer, startTimer, time, resetGame }) => {
  const renderStartButton = () => {
    return (
      <TouchableOpacity
        onPress={gameActive ? pauseTimer : startTimer}
        style={styles.startButton}
        activeOpacity={0.7}
      >
        <Text style={styles.buttonText}>{gameActive ? 'Pause' : time ? 'Resume' : 'Start'}</Text>
      </TouchableOpacity>
    )
  }

  const renderResetButton = () => {
    if (gameActive || (!gameActive && time)) return (
      <TouchableOpacity
        onPress={resetGame}
        style={styles.resetButton}
        activeOpacity={0.7}
      >
        <Text style={styles.buttonText}>Reset</Text>
      </TouchableOpacity>
    )
  }

  return (
    <View style={styles.container}>
      {renderStartButton()}
      {renderResetButton()}
    </View>
  )
}

const styles = ScaledSheet.create({
  container: {
    flexDirection: 'row',
    width: '100%'
  },
  startButton: {
    flex: 1,
    height: '42@vs',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: '6@s',
    backgroundColor: colors.orange
  },
  resetButton: {
    flex: 1,
    height: '42@vs',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: '6@s',
    backgroundColor: colors.purple,
    marginLeft: '12@s'
  },
  buttonText: {
    color: 'white',
    fontSize: '16@s',
    fontWeight: 'bold'
  }
})

export default Button