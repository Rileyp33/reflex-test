import React, { Component } from 'react'
import { View, TouchableOpacity, SafeAreaView, Text, Dimensions, Alert, TouchableWithoutFeedback } from 'react-native'
import { ScaledSheet } from 'react-native-size-matters'

import { times, formatTimerText } from './src/helpers'

const INITIAL_STATE = {
  time: 0,
  points: 1,
  turns: 1,
  level: 1,
  gameOver: false,
  turnPress: false,
  gameActive: false,
  activeColor: false,
  t1: 1000,
  activeSquare: null,
  t2: 2000
}

class App extends Component {
  constructor (props) {
    super(props)
    this.state = {
      time: 0,
      points: 1,
      turns: 1,
      level: 1,
      gameOver: false,
      turnPress: false,
      gameActive: false,
      activeColor: false,
      t1: 1000,
      activeSquare: null,
      t2: 2000
    }
  }

  componentDidUpdate() {
    const { gameActive, points } = this.state
    if (gameActive && points < 1) {
      this.clearAllTimers()
      Alert.alert(
        'Game Over',
        this.getGameResult(),
        [{ text: 'OK', onPress: () => this.setState(INITIAL_STATE) }],
        { cancelable: false }
      )
    }
  }

  getGameResult = () => {
    const { time, level } = this.state
    return `You reached level ${level} with a time of ${formatTimerText(time)}.`
  }

  clearAllTimers = () => {
    if (this.timerInterval) clearInterval(this.timerInterval)
    if (this.activeColorTimer) clearTimeout(this.activeColorTimer)
    if (this.activeSquareTimer) clearTimeout(this.activeSquareTimer)
  }

  componentWillUnmount() {
    this.clearAllTimers()
  }

  setActiveColorTimer = () => {
    const { t1, t2 } = this.state
    if ( t1 > t2 ) {
      if (!this.activeColorTimer) return
      this.setState({
        activeColor: true
      })
      clearTimeout(this.activeColorTimer)
    } else {
      this.activeColorTimer = setTimeout(() => {
        this.setState({ activeColor: false })
      }, t1)
    }
  }

  setActiveSquareTimer = () => {
    this.activeSquareTimer = setTimeout(() => {
      const { t1, t2, turns, level, gameActive, points, turnPress } = this.state
      this.setState({ turns: turns + 1 })
      if (turns % 5 === 0 && gameActive) this.setState({
        t1: t1 * 0.9,
        t2: t2 * 0.75,
        level: level + 1
      })
      if ( !turnPress && points === 1 ) {
        return this.setState({ points: 0 })
      } else if (!turnPress) {
        this.setState({ points: points - 1 })
      }
      this.runGame()
    }, this.state.t2)
  }

  runGame = () => {
    const randomIndex = Math.floor(Math.random() * Math.floor(16))
    this.setState({
      activeSquare: randomIndex,
      activeColor: true,
      turnPress: false
    })
    this.setActiveColorTimer()
    this.setActiveSquareTimer()
  }

  startTimer = () => {
    this.runGame()
    this.setState({ gameActive: true })
    this.timerInterval = setInterval(() => {
      this.setState({ time: this.state.time + 1 })
    }, 1000)
  }

  pauseTimer = () => {
    this.setState({ gameActive: false })
    clearInterval(this.timerInterval)
    if (this.activeColorTimer) clearTimeout(this.activeColorTimer)
    if (this.activeSquareTimer) clearTimeout(this.activeSquareTimer)
  }

  handlePress = (i) => {
    const { activeSquare, points, gameActive } = this.state
    if (gameActive) {
      this.setState({
        points: i === activeSquare ? points + 1 : points - 1,
        turnPress: true
      })
    }
  }

  renderGameButton = (i) => {
    const { activeSquare, activeColor, gameActive } = this.state
    const containerWidth = Dimensions.get('window').width - 32
    const buttonWidth = containerWidth / 4
    return (
      <TouchableOpacity
        key={i}
        onPress={() => this.handlePress(i)}
        disabled={!gameActive}
        style={[
          styles.gameButton,
          {
            width: buttonWidth,
            height: buttonWidth,
            backgroundColor: activeSquare === i && activeColor ? 'blue' : null
          }
        ]}
      />
    )
  }

  render() {
    const { points, time, gameActive } = this.state
    return (
      <SafeAreaView style={styles.container}>
        <Text style={styles.header}>The Reflex Game</Text>
        <View style={styles.gameContainer}>
          <View style={styles.boardContainer}>
            {times(16, this.renderGameButton)}
          </View>
          <View style={styles.bottomContainer}>
            <TouchableOpacity
              style={styles.emptyPressable}
              onPress={() => this.handlePress(null)}
              disabled={!gameActive}
            />
            <View style={styles.gameDataContainer}>
              <Text style={styles.gameDataText}>{`Points: ${points}`}</Text>
              <Text style={styles.gameDataText}>{formatTimerText(time)}</Text>
            </View>
            <View style={styles.gameDataContainer}>
              <Text style={styles.gameDataText}>{`Turns: ${this.state.turns}`}</Text>
              <Text style={styles.gameDataText}>{`Level: ${this.state.level}`}</Text>
            </View>
            <TouchableOpacity
              onPress={gameActive ? this.pauseTimer : this.startTimer}
              style={styles.startButton}
              activeOpacity={0.7}
            >
              <Text style={styles.startButtonText}>{gameActive ? 'Pause' : time ? 'Resume' : 'Start'}</Text>
            </TouchableOpacity>
          </View>
        </View>
      </SafeAreaView>
    )
  }
}

const styles = ScaledSheet.create({
  container: {
    margin: 15,
    flex: 1
  },
  header: {
    textAlign: 'center',
    marginVertical: '15@s',
    fontSize: '18@s',
    fontWeight: 'bold'
  },
  gameContainer: {
    flex: 1,
    justifyContent: 'space-between'
  },
  boardContainer: {
    borderWidth: 1,
    borderColor: 'gray',
    flexWrap: 'wrap',
    flexDirection: 'row'
  },
  bottomContainer: {
    flex: 1
  },
  emptyPressable: {
    flex: 1
  },
  gameDataContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: '15@vs'
  },
  gameDataText: {
    fontSize: '16@s'
  },
  gameButton: {
    borderWidth: 1,
    borderColor: 'gray'
  },
  startButton: {
    width: '100%',
    height: '45@vs',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: '6@s',
    backgroundColor: 'gray'
  },
  startButtonText: {
    color: 'white',
    fontSize: '16@s',
    fontWeight: 'bold'
  }
})

export default App
