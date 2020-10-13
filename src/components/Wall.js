import React from 'react'
import { View, Image } from 'react-native'
import { ScaledSheet } from 'react-native-size-matters'

import { colors } from '../styles'

const Wall = ({ i }) => {
  const renderHole = (i) => {
    switch(i % 5) {
      case 0:
        return (
          <Image
            source={require('../assets/wall/zero.png')}
            style={styles.image}
          />
        )
      case 1:
        return (
          <Image
            source={require('../assets/wall/one.png')}
            style={styles.image}
          />
        )
      case 2:
        return (
          <Image
            source={require('../assets/wall/two.png')}
            style={styles.image}
          />
        )
      case 3:
        return (
          <Image
            source={require('../assets/wall/three.png')}
            style={styles.image}
          />
        )
      case 4:
        return (
          <Image
            source={require('../assets/wall/four.png')}
            style={styles.image}
          />
        )
      default:
        return (
          <Image
            source={require('../assets/wall/zero.png')}
            style={styles.image}
          />
        )
    }
  }
  return (
    <View style={styles.container}>
      {renderHole(i)}
    </View>
  )
}

const styles = ScaledSheet.create({
  container: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 100,
    position: 'absolute',
    borderWidth: '6@s',
    borderColor: colors.tan
  },
  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'stretch'
  }
})

export default Wall