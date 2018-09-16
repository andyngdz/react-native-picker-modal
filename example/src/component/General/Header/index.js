import React, { PureComponent } from 'react'
import { View, Text } from 'react-native'
import PropTypes from 'prop-types'
import styles from './styles'

class Header extends PureComponent {
  render() {
    const { title } = this.props
    return (
      <View style={styles.headerContainer}>
        <Text style={styles.headerText}>{title}</Text>
      </View>
    )
  }
}

Header.propsTypes = {
  title: PropTypes.string.isRequired
}

export default Header
