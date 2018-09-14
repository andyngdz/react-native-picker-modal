import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { Text } from 'react-native'

class Header extends PureComponent {
  render() {
    const { title } = this.props
    return <Text>{title}</Text>
  }
}

Header.propsTypes = {
  title: PropTypes.string.isRequired
}

export default Header
