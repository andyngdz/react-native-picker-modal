import React, { PureComponent } from 'react'
import { TouchableOpacity, View, Image } from 'react-native'
import PropTypes from 'prop-types'
import Images from '../../../image'
import styles from './styles'

class BClose extends PureComponent {
  render() {
    const { onPress } = this.props
    return (
      <TouchableOpacity onPress={onPress}>
        <View style={styles.closeButtonContainer}>
          <Image source={Images.close} style={styles.closeImg} />
        </View>
      </TouchableOpacity>
    )
  }
}

BClose.propTypes = {
  onPress: PropTypes.func.isRequired
}

export default BClose
