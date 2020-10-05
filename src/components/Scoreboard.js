import React from 'react'
import { TouchableOpacity, View, Text } from 'react-native'
import { ScaledSheet } from 'react-native-size-matters'

import PlusMinus from './PlusMinus'
import ScoringItem from './ScoringItem'
import { formatTimerText } from '../helpers'
import { colors } from '../styles'

const Scoreboard = ({
  handlePress,
  gameActive,
  highScore,
  level,
  time,
  points,
  setDifficulty,
  nSquares
}) => {
  return (
    <TouchableOpacity
      style={styles.container}
      onPress={() => handlePress(null)}
      activeOpacity={1}
      disabled={!gameActive}
    >
      <View style={styles.difficultyContainer}>
        <Text style={styles.difficultyText}>{`Difficulty: ${nSquares}`}</Text>
        <PlusMinus onSelect={setDifficulty}/>
      </View>
      <View style={styles.gameDataContainer}>
        <ScoringItem
          label={'High Score'}
          data={highScore ? formatTimerText(highScore) : 'N/A'}
          containerColor={colors.blue}
          labelColor='white'
          dataColor='white'
          barColor='white'
        />
        <ScoringItem
          label={'Level'}
          data={level}
          containerColor={colors.blue}
          labelColor='white'
          dataColor='white'
          barColor='white'
        />
      </View>
      <View style={styles.gameDataContainer}>
        <ScoringItem
          label={'Time'}
          data={formatTimerText(time)}
          containerColor={colors.yellow}
          labelColor={colors.darkGray}
          dataColor='black'
          barColor={colors.darkGray}
        />
        <ScoringItem
          label={'Points'}
          data={points}
          containerColor={colors.yellow}
          labelColor={colors.darkGray}
          dataColor='black'
          barColor={colors.darkGray}
        />
      </View>
    </TouchableOpacity>
  )
}

const styles = ScaledSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-end',
    marginBottom: '10@vs',
    borderBottomColor: 'gray',
    borderBottomWidth: 1
  },
  gameDataContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: '10@vs'
  },
  difficultyContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  difficultyText: {
    color: colors.orange,
    fontWeight: 'bold',
    fontSize: '16@s',
    alignSelf: 'flex-end',
    marginBottom: `10@vs`
  }
})

export default Scoreboard