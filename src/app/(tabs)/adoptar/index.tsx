import { View, Text } from 'react-native'
import React from 'react'
import LogoutButton from '@/src/components/molecules/LogoutButton'

const Adoptar = () => {
  return (
    <View>
      <Text>Adoptar</Text>
      <View style={{ padding: 20, gap: 15 }}>
      {/* Otras opciones de perfil */}
      <LogoutButton />
    </View>
    </View>
  )
}

export default Adoptar