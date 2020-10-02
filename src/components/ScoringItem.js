import React from 'react'
import { View, Text } from 'react-native'
import { ScaledSheet } from 'react-native-size-matters'

const ScoringItem = ({ label, containerColor, labelColor, dataColor, barColor, data }) => {
  return (
    <View style={[styles.textContainer, { backgroundColor: containerColor }]}>
      <View style={styles.label}>
        <Text style={[styles.gameDataText, { color: labelColor }]}>{label}</Text>
      </View>
      <View style={[styles.dataItem, { borderLeftColor: barColor }]}>
        <Text style={[styles.gameDataText, { color: dataColor }]}>{data}</Text>
      </View>
    </View>
  )
}

const styles = ScaledSheet.create({
  textContainer: {
    width: '49%',
    paddingVertical: '10@s',
    paddingHorizontal: '8@s',
    borderRadius: '4@s',
    flexDirection: 'row'
  },
  gameDataText: {
    fontSize: '14@s',
    fontWeight: 'bold',
    textAlign: 'justify'
  },
  dataItem: {
    width: '37%',
    borderLeftColor: 'white',
    borderLeftWidth: 1,
    flexDirection: 'row',
    justifyContent: 'center'
  },
  label: {
    width: '63%%'
  }
})

export default ScoringItem