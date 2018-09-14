import { StyleSheet } from 'react-native'
import Theme, { Metrics, Colors } from '../../../theme'

export default StyleSheet.create({
  charContainer: {
    width: Metrics.takeWidth(0.05),
    height: Metrics.takeWidth(0.05),
    borderRadius: Metrics.takeWidth(0.025),
    margin: Metrics.takeWidth(0.005),
    backgroundColor: Colors.info,
    ...Theme.verticalContentCenterWithoutFlex
  },
  text: {
    color: Colors.white
  }
})
