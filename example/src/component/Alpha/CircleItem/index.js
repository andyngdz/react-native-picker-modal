import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { Text, View } from 'react-native'
import styles from './styles'

class CircleItem extends PureComponent {
  render() {
    const { text } = this.props
    return (
      <View style={styles.charContainer}>
        <Text style={styles.text}>{text}</Text>
      </View>
    )
  }
}

CircleItem.propTypes = {
  text: PropTypes.string.isRequired
}

export default CircleItem
