import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { View, TextInput } from 'react-native'
import { Colors } from '../../theme'
import styles from './styles'

class FilterBar extends PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      value: String()
    }
  }

  /**
   * This function will be called whenever user is typing on input
   * @param {String} value The new text
   */
  onChangeText = value => {
    const { onChangeText } = this.props
    this.setState({ value }, onChangeText(value))
  }

  render() {
    const { value } = this.state
    const { placeholder, filterBarProps } = this.props
    const { containerStyle, inputStyle, containerProps, inputProps, selectionColor } = filterBarProps
    return (
      <View style={[styles.container, containerStyle]} {...containerProps}>
        <TextInput
          style={[styles.input, inputStyle]}
          placeholder={placeholder}
          onChangeText={this.onChangeText}
          selectionColor={selectionColor}
          value={value}
          {...inputProps}
        />
      </View>
    )
  }
}

FilterBar.propTypes = {
  filterBarProps: PropTypes.shape({
    containerStyle: PropTypes.object,
    inputStyle: PropTypes.object,
    containerProps: PropTypes.object,
    inputProps: PropTypes.object,
    selectionColor: PropTypes.string
  }),
  placeholder: PropTypes.string,
  onChangeText: PropTypes.func
}

FilterBar.defaultProps = {
  placeholder: 'Your country',
  filterBarProps: {
    selectionColor: Colors.border
  },
  onChangeText: () => {}
}

export default FilterBar
