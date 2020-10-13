import React from 'react'
import { View, Image } from 'react-native'
import { ScaledSheet } from 'react-native-size-matters'
import FlipCard from 'react-native-flip-card'

import { colors } from '../styles'

const Flip = ({ flipped, i }) => {
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

  return (
    <FlipCard
      style={styles.container}
      friction={3}
      perspective={0}
      flipVertical={false}
      flipHorizontal={true}
      useNativeDriver={true}
      flip={flipped}
    >
      <View
        style={styles.down}
      />
      <View
        style={styles.up}
      >
        {renderCard(i)}
      </View>
    </FlipCard>
  )
}

const styles = ScaledSheet.create({
  container: {
    flex: 1
  },
  down: {
    backgroundColor: colors.gray,
    width: '100%',
    height: '100%'
  },
  up: {
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
  }
})

export default Flip