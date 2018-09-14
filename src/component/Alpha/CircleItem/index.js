import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { Text, View } from 'react-native'

class CircleItem extends PureComponent {
  render() {
    const { text } = this.props
    return (
      <View>
        <Text>{text}</Text>
      </View>
    )
  }
}

CircleItem.propTypes = {
  text: PropTypes.string.isRequired
}

export default CircleItem
