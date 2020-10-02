import React from 'react'
import { Text, TouchableOpacity } from 'react-native'
import { ScaledSheet } from 'react-native-size-matters'

import { colors } from '../styles'

const Button = ({ gameActive, pauseTimer, startTimer, time}) => {
  return (
    <TouchableOpacity
      onPress={gameActive ? pauseTimer : startTimer}
      style={styles.startButton}
      activeOpacity={0.7}
    >
      <Text style={styles.startButtonText}>{gameActive ? 'Pause' : time ? 'Resume' : 'Start'}</Text>
    </TouchableOpacity>
  )
}

const styles = ScaledSheet.create({
  startButton: {
    width: '100%',
    height: '45@vs',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: '6@s',
    backgroundColor: colors.orange
  },
  startButtonText: {
    color: 'white',
    fontSize: '16@s',
    fontWeight: 'bold'
  }
})

export default Button