import React from 'react'
import { SafeAreaView } from 'react-native'
import { Font, AppLoading } from 'expo'
import { Screen, View, Heading, Caption } from '@shoutem/ui'
import { CountryPicker } from './component'
import styles from './styles'

/**
 * RNPickerModal
 * @description `The React Native Picker component package using SectionList and Alphabet`
 * @website https://github.com/itanhduy/react-native-picker
 * @by `Andy Ng`
 * @email `itc.anhduy@gmail.com`
 * @when `2018-09-16 16:31:08`
 */
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
      <SafeAreaView style={styles.safeAreaContainer}>
        <Screen styleName="paper">
          <View styleName="flexible vertical v-center h-center lg-gutter">
            <View>
              <Heading>RNPickerModal</Heading>
              <Caption>
                In order to test this plugin. Please turn off dev, optimize your code, run on real device before to see
                real performance.
              </Caption>
            </View>
            <View styleName="lg-gutter-top">
              <CountryPicker />
            </View>
          </View>
        </Screen>
      </SafeAreaView>
    )
  }
}
