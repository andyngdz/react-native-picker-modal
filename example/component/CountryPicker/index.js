import React, { PureComponent } from 'react'
import { View, Button, Text } from '@shoutem/ui'

class CountryPicker extends PureComponent {
  render() {
    return (
      <View styleName="lg-gutter">
        <Button styleName="secondary">
          <Text>Country Picker</Text>
        </Button>
      </View>
    )
  }
}

export default CountryPicker
