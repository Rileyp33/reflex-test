import React from 'react'
import { View, ScrollView, TouchableOpacity, Text, StyleSheet, Image } from 'react-native'
import Modal from 'react-native-modal'
import { ScaledSheet } from 'react-native-size-matters'
import { colors } from '../styles'
import PlusMinus from './PlusMinus'

const InfoModal = ({ onClose, visible }) => {
  return (
    <Modal
      style={styles.conatiner}
      isVisible={visible}
      onBackdropPress={onClose}
    >
      <View style={styles.contentContainer}>
        <View>
          <Text style={styles.header}>How to play</Text>
          <View style={styles.divider}/>
        </View>
        <ScrollView contentContainerStyle={styles.content}>
          {instructions.map(i => (
            <View style={styles.item} key={i.key}>
              {i.icon}
              <Text style={styles.text}>{i.text}</Text>
            </View>
          ))}
        </ScrollView>
        <TouchableOpacity
          onPress={onClose}
          style={styles.closeButton}
          activeOpacity={0.7}
        >
          <Text style={styles.closeButtonText}>Let's Play!</Text>
        </TouchableOpacity>
      </View>
    </Modal>
  )
}

export default InfoModal

const styles = ScaledSheet.create({
  conatiner: {
    marginVertical: '50@s',
    marginHorizontal: '20@s',
    borderWidth: '3@s',
    borderColor: colors.yellow,
    borderRadius: '24@s',
  },
  contentContainer: {
    flex: 1,
    backgroundColor: 'white',
    borderRadius: '20@s',
    justifyContent: 'space-between'
  },
  closeButton: {
    alignSelf: 'center',
    width: '90%',
    height: '45@vs',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: '6@s',
    backgroundColor: colors.purple,
    marginBottom: '20@s'
  },
  closeButtonText: {
    color: 'white',
    fontSize: '16@s',
    fontWeight: 'bold'
  },
  header: {
    textAlign: 'center',
    marginVertical: '15@s',
    fontSize: '22@s',
    fontWeight: 'bold',
    color: colors.blue
  },
  divider: {
    width: '90%',
    alignSelf: 'center',
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: colors.darkGray
  },
  image: {
    height: '36@s',
    width: '36@s',
    marginRight: '12@s',
    borderWidth: 1,
    borderRadius: '8@s',
    borderColor: colors.darkGray
  },
  plusMinus: {
    borderWidth: 0
  },
  content: {
    marginVertical: '20@s',
    flex: 1,
    justifyContent: 'space-evenly'
  },
  item: {
    flexDirection: 'row',
    width: '85%',
    marginRight: '5@s',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    alignSelf: 'center',
    marginBottom: '20@s',
  },
  text: {
    flex: 1,
    fontSize: '17@s',
    color: 'gray'
  }
})

const instructions = [
  {
    icon: <View style={[styles.image, styles.plusMinus]}>
      <PlusMinus/>
    </View>,
    text: 'Select your difficulty level. Quick fingers? More monsters.',
    key: 'plus'
  },
  {
    icon: <Image
      source={require('../assets/FingerIcon.jpg')}
      style={styles.image}
    />,
    text: 'Hone your reflexes. Start each new game with one point and add to your score for every moster mashed. Careful! If you miss your mark, you lose a point.',
    key: 'finger'
  },
  {
    icon: <Image
      source={require('../assets/Stopwatch.png')}
      style={styles.image}
    />,
    text: 'Level up for every five turns you stay alive. How fast are you?',
    key: 'watch'
  },
]
