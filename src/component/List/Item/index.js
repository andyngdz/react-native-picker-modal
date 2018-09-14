import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { View } from 'react-native'

class Item extends PureComponent {
  render() {
    const { item, index, section } = this.props
    return <View>{index}</View>
  }
}

Item.propsTypes = {
  item: PropTypes.object.isRequired,
  index: PropTypes.number,
  section: PropTypes.object
}

export default Item
