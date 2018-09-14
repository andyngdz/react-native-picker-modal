import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { View, Image, Text } from 'react-native'

class Item extends PureComponent {
  /**
   * Check if we should render description
   */
  renderDescription = () => {
    const { item } = this.props
    const { description } = item
    return description && <Text>item.description</Text>
  }

  render() {
    const { item } = this.props
    const { image, title, rightItem } = item
    return (
      <View>
        <View>
          <Image source={{ uri: image }} />
          <View>
            <Text>{title}</Text>
            {this.renderDescription()}
          </View>
        </View>
        <View>{rightItem}</View>
      </View>
    )
  }
}

Item.propsTypes = {
  item: PropTypes.object.isRequired,
  index: PropTypes.number,
  section: PropTypes.object
}

export default Item
