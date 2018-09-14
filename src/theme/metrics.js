import { Dimensions } from 'react-native'

const windowSize = Dimensions.get('window')

const Metrics = {
  height: 10,
  width: 10,
  baseSize: 5,
  basePadding: 5,
  baseMargin: 5,
  baseFontSize: 10,
  screenWidth: windowSize.width,
  screenHeight: windowSize.height,
  /**
   * Take screen width depends on ratio
   * Ex: screenWidth: 500 with ratio 0.5 => 250
   *       screenWidth: 500 with ratio 0.7 => 350
   * @param {Number} ratio The part of width needs to get {0-1}
   */
  takeWidth: ratio => {
    return Metrics.screenWidth * ratio
  }
}

export default Metrics
