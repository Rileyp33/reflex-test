import React from 'react'
import { TouchableOpacity } from 'react-native'
import { scale } from 'react-native-size-matters'
import Info from './Info'
import { colors } from '../styles'

const InfoButton = ({ onPress }) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={0.7}
    >
      <Info
        height={scale(36)}
        width={scale(36)}
        fill={colors.orange}
        style={{ marginRight: scale(10) }}
      />
    </TouchableOpacity>
  )
}

export default InfoButton
