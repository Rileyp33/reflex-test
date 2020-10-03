import React, { Component } from 'react'
import {
  View,
  SafeAreaView,
  Text,
  Alert,
  Image
} from 'react-native'
import { ScaledSheet } from 'react-native-size-matters'
import AsyncStorage from '@react-native-community/async-storage';

import Board from './Board'
import Button from './Button'
import Scoreboard from './Scoreboard'
import { formatTimerText } from '../helpers'
import { colors } from '../styles'

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

class Game extends Component {
  constructor(props) {
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
      t2: 2000,
      highScore: null
    }
  }

  componentDidMount = async () => {
    const highScore = await AsyncStorage.getItem('highScore')
    this.setState({ highScore: highScore ? parseInt(highScore) : '' })
  }

  componentDidUpdate = async () => {
    const { gameActive, points } = this.state
    if (gameActive && points < 1) {
      this.clearAllTimers()
      const gameResult = await this.getGameResult()
      if (gameResult) {
        Alert.alert(
          'Game Over',
          gameResult,
          [{ text: 'OK', onPress: () => this.setState(INITIAL_STATE) }],
          { cancelable: false }
        )
      }
    }
  }

  getGameResult = async () => {
    const { time, level, highScore } = this.state
    let newHighScore
    if (!highScore || time > highScore) {
      newHighScore = time
      const timeString = time.toString()
      await AsyncStorage.setItem('highScore', timeString)
      this.setState({ highScore: newHighScore })
    }
    let gameResult = `You reached level ${level} with a time of ${formatTimerText(time)}.`
    if (newHighScore) gameResult += `\nNew high score!`
    return gameResult
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
    if (t1 > t2) {
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
      if (
        turns !== 1 &&
        (turns + 1) % 5 === 0 &&
        gameActive
      ) {
        this.setState({
          t1: t1 * 0.9,
          t2: t2 * 0.75,
          level: level + 1
        })
      }
      this.setState({ turns: turns + 1 })
      if (!turnPress && points === 1) {
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
    const {
      activeSquare,
      points,
      gameActive,
      turnPress
    } = this.state
    if (gameActive && !turnPress) {
      this.setState({
        points: i === activeSquare ? points + 1 : points - 1,
        turnPress: true
      })
    }
  }

  render() {
    const {
      points,
      time,
      gameActive,
      highScore,
      level,
      activeSquare,
      activeColor
    } = this.state
    return (
      <>
        <Image
            source={require('../assets/Texture.jpg')}
            style={styles.imageBackground}
          />
        <SafeAreaView style={styles.container}>
          <Text style={styles.header}>The Reflex Game</Text>
          <View style={styles.gameContainer}>
            <Board
              activeSquare={activeSquare}
              activeColor={activeColor}
              gameActive={gameActive}
              handlePress={this.handlePress}
            />
            <View style={styles.bottomContainer}>
              <Scoreboard
                handlePress={this.handlePress}
                gameActive={gameActive}
                highScore={highScore}
                level={level}
                time={time}
                points={points}
              />
              <Button
                gameActive={gameActive}
                pauseTimer={this.pauseTimer}
                startTimer={this.startTimer}
                time={time}
              />
            </View>
          </View>
        </SafeAreaView>
      </>
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
    fontSize: '22@s',
    fontWeight: 'bold',
    color: colors.orange
  },
  gameContainer: {
    flex: 1,
    justifyContent: 'space-between'
  },
  bottomContainer: {
    flex: 1
  },
  imageBackground: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
    position: 'absolute',
    zIndex: -1
  }
})

export default Game