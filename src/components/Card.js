import React from 'react'
import { View, Image } from 'react-native'
import { ScaledSheet } from 'react-native-size-matters'
import * as Animatable from 'react-native-animatable'

import { colors } from '../styles'

const Card = ({ interval, flipped, i }) => {
  const renderHole = (i) => {
    switch (i % 5) {
      case 0:
        return (
          <Image
            source={require('../assets/wall/zero.png')}
            style={styles.holeImage}
          />
        )
      case 1:
        return (
          <Image
            source={require('../assets/wall/one.png')}
            style={styles.holeImage}
          />
        )
      case 2:
        return (
          <Image
            source={require('../assets/wall/two.png')}
            style={styles.holeImage}
          />
        )
      case 3:
        return (
          <Image
            source={require('../assets/wall/three.png')}
            style={styles.holeImage}
          />
        )
      case 4:
        return (
          <Image
            source={require('../assets/wall/four.png')}
            style={styles.holeImage}
          />
        )
      default:
        return (
          <Image
            source={require('../assets/wall/zero.png')}
            style={styles.holeImage}
          />
        )
    }
  }

  const renderCard = (i) => {
    switch (i % 5) {
      case 0:
        return (
          <Image
            source={require('../assets/cards/zero.png')}
            style={styles.image}
          />
        )
      case 1:
        return (
          <Image
            source={require('../assets/cards/one.png')}
            style={styles.image}
          />
        )
      case 2:
        return (
          <Image
            source={require('../assets/cards/two.png')}
            style={styles.image}
          />
        )
      case 3:
        return (
          <Image
            source={require('../assets/cards/three.png')}
            style={styles.image}
          />
        )
      case 4:
        return (
          <Image
            source={require('../assets/cards/four.png')}
            style={styles.image}
          />
        )
      default:
        return (
          <Image
            source={require('../assets/cards/zero.png')}
            style={styles.image}
          />
        )
    }
  }

  const getAnimation = (i) => {
    switch(i % 5) {
      case 0: return 'flipInY'
      case 1: return 'rubberBand'
      case 2: return 'jello'
      case 3: return 'rotate'
      case 4: return 'wobble'
      default: return 'bounceIn'
    }
  }

  return (
      <View style={styles.container}>
        <View style={styles.holeContainer}>
          {renderHole(i)}
        </View>
        {!flipped && <View style={styles.down} />}
        {flipped &&
          <Animatable.View
            animation={getAnimation(i)}
            duration={interval * 0.6}
            style={styles.up}
          >
            {renderCard(i)}
          </Animatable.View>}
      </View>
  )
}

const styles = ScaledSheet.create({
  container: {
    height: '100%',
    width: '100%',
    overflow: 'hidden'
  },
  down: {
    backgroundColor: colors.gray,
    width: '100%',
    height: '100%'
  },
  up: {
    zIndex: -100,
    backgroundColor: 'black',
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center'
  },
  image: {
    width: '76%',
    height: '76%',
    resizeMode: 'cover'
  },
  holeContainer: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 100,
    position: 'absolute',
    borderWidth: '6@s',
    borderColor: colors.tan
  },
  holeImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'stretch'
  }
})

export default Card