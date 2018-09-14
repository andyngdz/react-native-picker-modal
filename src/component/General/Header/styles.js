import { StyleSheet } from 'react-native'
import Theme, { Metrics, Colors } from '../../../theme'

export default StyleSheet.create({
  headerContainer: {
    ...Theme.horizontalCenter,
    ...Theme.flexDirectionRow,
    backgroundColor: Colors.background,
    padding: Metrics.basePadding * 2
  },
  headerText: {
    fontSize: Metrics.baseFontSize * 2
  }
})
