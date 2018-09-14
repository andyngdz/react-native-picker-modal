import { StyleSheet } from 'react-native'
import Theme, { Metrics } from '../../../theme'

export default StyleSheet.create({
  itemContainer: {
    ...Theme.horizontalCenter,
    ...Theme.flexDirectionRow,
    ...Theme.spaceBetween,
    padding: Metrics.basePadding * 2
  },
  itemInfo: {
    ...Theme.horizontalCenter,
    ...Theme.flexDirectionRow
  },
  itemInfoText: {
    paddingLeft: Metrics.basePadding * 2
  },
  smallImage: Theme.smallImage
})
