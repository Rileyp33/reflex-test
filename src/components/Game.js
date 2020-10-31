import React, { Component } from 'react'
import {
  View,
  SafeAreaView,
  Text,
  Alert,
  Image,
  StyleSheet
} from 'react-native'
import { ScaledSheet } from 'react-native-size-matters'
import AsyncStorage from '@react-native-community/async-storage';

import Board from './Board'
import Button from './Button'
import Scoreboard from './Scoreboard'
import { formatTimerText, times } from '../helpers'
import { colors } from '../styles'

const RESET_STATE = {
  time: 0,
  points: 1,
  turns: 1,
  level: 1,
  gameOver: false,
  turnPresses: [],
  gameActive: false,
  activeColor: false,
  t1: 1000,
  activeSquares: [],
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
      turnPresses: [],
      gameActive: false,
      activeColor: false,
      t1: 1000,
      activeSquares: [],
      t2: 2000,
      nSquares: 1,
      useAfter: false,
      highScore: null
    }
  }

  componentDidMount = () => {
    this.getHighScore()
  }

  componentDidUpdate = async (_, prevState) => {
    const { gameActive, points, nSquares } = this.state
    if (
      gameActive &&
      points === 0 &&
      points !== prevState.points
    ) {
      this.clearAllTimers()
      this.setState(RESET_STATE)
      const gameResult = await this.getGameResult()
      if (gameResult) {
        Alert.alert(
          'Game Over',
          gameResult,
          [
            {
              text: 'OK',
              onPress: () => this.setState(RESET_STATE)
            },
          ],
          { cancelable: false }
        )
      }
    }
    if (prevState.nSquares !== nSquares) {
      this.getHighScore()
    }
  }

  getHighScore = async () => {
    const { nSquares } = this.state
    const highScore = await AsyncStorage.getItem(nSquares.toString())
    this.setState({ highScore: highScore ? parseInt(highScore) : '' })
  }

  getGameResult = async () => {
    const { time, level, highScore, nSquares } = this.state
    let newHighScore
    if (!highScore || time > highScore) {
      newHighScore = time
      const timeString = time.toString()
      await AsyncStorage.setItem(nSquares.toString(), timeString)
      this.setState({ highScore: newHighScore })
    }
    let gameResult = `You reached level ${level} with a time of ${formatTimerText(time)}.`
    if (newHighScore) gameResult += `\nNew high score for difficulty level ${nSquares}!`
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
      this.setState({ activeColor: true })
      clearTimeout(this.activeColorTimer)
    } else {
      this.activeColorTimer = setTimeout(() => {
        this.setState({ activeColor: false })
      }, t1)
    }
  }

  setActiveSquareTimer = () => {
    this.activeSquareTimer = setTimeout(() => {
      const {
        t1,
        t2,
        turns,
        level,
        gameActive,
        points,
        turnPresses,
        nSquares
      } = this.state
      const timeoutPoints = nSquares - turnPresses.length
      if (
        turns !== 1 &&
        (turns + 1) % 5 === 0 &&
        gameActive
      ) {
        this.setState({
          t1: t1 * 0.98,
          t2: t2 * 0.95,
          level: level + 1
        })
      }
      this.setState({ turns: turns + 1 })
      if (timeoutPoints && points - timeoutPoints < 1) {
        return this.setState({ points: 0 })
      } else if (timeoutPoints) {
        this.setState({ points: points - timeoutPoints })
      }
      this.runGame()
    }, this.state.t2)
  }

  getRandomIndex = () => {
    return Math.floor(Math.random() * Math.floor(16))
  }

  getNrandomIndices = (nSquares) => {
    let randomIndices = []
    const pushNewIndex = () => {
      const newIndex = this.getRandomIndex()
      if (!randomIndices.includes(newIndex)) {
        randomIndices.push(newIndex)
      } else {
        pushNewIndex()
      }
    }
    times(nSquares, pushNewIndex)
    return randomIndices
  }

  runGame = () => {
    const { nSquares } = this.state
    const randomSquares = this.getNrandomIndices(nSquares)
    this.setState({
      activeSquares: randomSquares,
      activeColor: true,
      useAfter: false,
      turnPresses: []
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
      activeSquares,
      points,
      gameActive,
      turnPresses
    } = this.state
    const scored = activeSquares.includes(i)
    if (gameActive && !turnPresses.includes(i)) {
      this.setState({
        points: scored ? points + 1 : points - 1,
        useAfter: scored,
        turnPresses: [...turnPresses, i]
      })
    }
  }

  setDifficulty = (n) => this.setState({ nSquares: n })

  render() {
    const {
      points,
      time,
      gameActive,
      highScore,
      level,
      activeSquares,
      activeColor,
      turns,
      nSquares,
      useAfter,
      t1
    } = this.state
    return (
      <View style={styles.screen}>
        <Image
          source={require('../assets/Texture.png')}
          style={styles.imageBackground}
        />
        <Image
          source={require('../assets/Crack.png')}
          style={[styles.imageBackground, styles.crack]}
        />
        <SafeAreaView style={styles.container}>
          <View style={styles.titleContainer}>
            <Image
              source={require('../assets/GhostTransparent.png')}
              style={styles.titleImageLeft}
            />
            <Text style={styles.header}>Whack-a-Monster!</Text>
            <Image
              source={require('../assets/TransparentMonster.png')}
              style={styles.titleImageRight}
            />
          </View>
          <View style={styles.gameContainer}>
            <Board
              activeSquares={activeSquares}
              activeColor={activeColor}
              useAfter={useAfter}
              gameActive={gameActive}
              handlePress={this.handlePress}
              interval={t1}
            />
            <View style={styles.bottomContainer}>
              <Scoreboard
                handlePress={this.handlePress}
                setDifficulty={this.setDifficulty}
                gameActive={gameActive}
                highScore={highScore}
                level={level}
                time={time}
                points={points}
                nSquares={nSquares}
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
      </View>
    )
  }
}

const styles = ScaledSheet.create({
  screen: {
    backgroundColor: colors.tan,
    flex: 1
  },
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
    resizeMode: 'contain',
    opacity: 0.4,
    position: 'absolute',
    top: 350,
    zIndex: -1
  },
  crack: {
    left: 90
  },
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: '8@s',
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: colors.darkGray
  },
  titleImageLeft: {
    height: '34@s',
    width: '34@s'
  },
  titleImageRight: {
    height: '38@s',
    width: '38@s',
    transform: [{ rotateY: '180deg' }]
  }
})

export default Game