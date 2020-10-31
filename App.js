import React from 'react'
import { StatusBar } from 'react-native'
import Game from './src/components/Game'

const App = () => {
  return (
    <React.Fragment>
      <StatusBar barStyle='dark-content'/>
      <Game/>
    </React.Fragment>
  )
}

export default App

