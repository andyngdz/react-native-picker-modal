import { StyleSheet } from 'react-native'
import Theme, { Metrics } from './theme'

export default StyleSheet.create({
  listData: {
    width: Metrics.takeWidth(0.85)
  },
  listAlpha: {
    width: Metrics.takeWidth(0.15)
  },
  listContainer: {
    ...Theme.flexRow
  }
})
