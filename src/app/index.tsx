import { View, Text, Image} from 'react-native'
import React from 'react'

const icon = require('../assets/images/cat-dog-logo.png');

const Main = () => {
  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <Image source= {icon} style={{width: 100, height: 100, alignSelf: 'center'}} />
      <Text>Encuentra tu mascota</Text>
    </View>
  )
}

export default Main