import React from 'react'
import { Image, TouchableOpacity, ActionSheetIOS } from 'react-native'
import { ScaledSheet } from 'react-native-size-matters'

const PlusMinus = ({ onSelect }) => {

  const onPress = () => {
    ActionSheetIOS.showActionSheetWithOptions(
      {
        options: [
          'Cancel',
          '1 - Easy',
          '2 - Medium',
          '3 - Hard'
        ],
        cancelButtonIndex: 0,
        title: 'Difficulty Level'
      },
      i => {
        if (i !== 0)onSelect(i)
      }
    )
  }

  return (
    <TouchableOpacity
      style={styles.container}
      onPress={onPress}
      activeOpacity={0.7}
    >
      <Image
        source={require('../assets/PlusMinus.png')}
        style={styles.image}
      />
    </TouchableOpacity>
  )
}

const styles = ScaledSheet.create({
  container: {
    width: '28@s',
    height: '28@s',
    marginBottom: '10@vs',
    alignSelf: 'flex-end'
  },
  image: {
    width: '100%',
    height: '100%'
  }
})

export default PlusMinus