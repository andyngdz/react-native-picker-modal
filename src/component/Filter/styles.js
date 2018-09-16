import { StyleSheet } from 'react-native'
import Theme, { Metrics } from '../../theme'

export default StyleSheet.create({
  container: {
    marginLeft: Metrics.baseMargin,
    ...Theme.flexible
  },
  input: {
    padding: Metrics.basePadding * 3
  }
})
