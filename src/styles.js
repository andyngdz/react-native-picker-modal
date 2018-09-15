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
    ...Theme.flexRow,
    ...Theme.flexible
  },
  safeAreViewContainer: {
    ...Theme.flexible,
    ...Theme.flexDirectionColumn
  },
  headerActionContainer: {
    ...Theme.horizontalCenter,
    ...Theme.flexRow,
    paddingTop: Metrics.basePadding * 3,
    paddingBottom: Metrics.basePadding * 3,
    paddingLeft: Metrics.basePadding * 2,
    paddingRight: Metrics.basePadding * 2
  }
})
