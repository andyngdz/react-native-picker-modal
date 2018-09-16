import React, { PureComponent } from 'react'
import { View, Button, Text } from '@shoutem/ui'
import RNPicker from '../../src/Picker'

class CountryPicker extends PureComponent {
  openModal = () => {
    this.rnPicker.openModal()
  }

  render() {
    return (
      <View styleName="lg-gutter">
        <Button styleName="secondary" onPress={this.openModal}>
          <Text>Open Country Picker</Text>
          <RNPicker ref={rnPicker => (this.rnPicker = rnPicker)} />
        </Button>
      </View>
    )
  }
}

export default CountryPicker
