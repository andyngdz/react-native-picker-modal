import React, { PureComponent } from 'react'
import { View, ActivityIndicator } from 'react-native'
import styles from './styles'

class Loader extends PureComponent {
  render() {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator />
      </View>
    )
  }
}

export default Loader
