import React from 'react'
import { SafeAreaView } from 'react-native'
import { Font, AppLoading } from 'expo'
import { Screen, View, Heading } from '@shoutem/ui'

export default class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      fontsAreLoaded: false
    }
  }

  async componentWillMount() {
    await Font.loadAsync({
      'Rubik-Black': require('./node_modules/@shoutem/ui/fonts/Rubik-Black.ttf'),
      'Rubik-BlackItalic': require('./node_modules/@shoutem/ui/fonts/Rubik-BlackItalic.ttf'),
      'Rubik-Bold': require('./node_modules/@shoutem/ui/fonts/Rubik-Bold.ttf'),
      'Rubik-BoldItalic': require('./node_modules/@shoutem/ui/fonts/Rubik-BoldItalic.ttf'),
      'Rubik-Italic': require('./node_modules/@shoutem/ui/fonts/Rubik-Italic.ttf'),
      'Rubik-Light': require('./node_modules/@shoutem/ui/fonts/Rubik-Light.ttf'),
      'Rubik-LightItalic': require('./node_modules/@shoutem/ui/fonts/Rubik-LightItalic.ttf'),
      'Rubik-Medium': require('./node_modules/@shoutem/ui/fonts/Rubik-Medium.ttf'),
      'Rubik-MediumItalic': require('./node_modules/@shoutem/ui/fonts/Rubik-MediumItalic.ttf'),
      'Rubik-Regular': require('./node_modules/@shoutem/ui/fonts/Rubik-Regular.ttf'),
      'rubicon-icon-font': require('./node_modules/@shoutem/ui/fonts/rubicon-icon-font.ttf')
    })

    this.setState({ fontsAreLoaded: true })
  }

  render() {
    const { fontsAreLoaded } = this.state
    if (!fontsAreLoaded) {
      return <AppLoading />
    }

    return (
      <Screen styleName="paper">
        <SafeAreaView>
          <View styleName="vertical v-center h-center lg-mutter">
            <Heading>RNPickerModal</Heading>
          </View>
        </SafeAreaView>
      </Screen>
    )
  }
}
