import { StyleSheet } from 'react-native'
import Theme, { Metrics, Colors } from '../../../theme'

export default StyleSheet.create({
  closeImg: {
    width: Metrics.baseSize * 2,
    height: Metrics.baseSize * 2,
    resizeMode: 'contain'
  },
  closeButtonContainer: {
    width: Metrics.baseSize * 5,
    height: Metrics.baseSize * 5,
    borderRadius: Metrics.baseSize * 2.5,
    backgroundColor: Colors.border,
    ...Theme.verticalContentCenterWithoutFlex
  }
})
