import { StyleSheet } from 'react-native'
import Theme, { Metrics, Colors } from '../../theme'

export default StyleSheet.create({
  container: {
    marginLeft: Metrics.baseMargin * 3,
    ...Theme.flexible
  },
  input: {
    paddingTop: Metrics.basePadding * 2,
    paddingBottom: Metrics.basePadding * 2,
    borderBottomWidth: Metrics.baseSize / 5,
    borderBottomColor: Colors.border
  }
})
