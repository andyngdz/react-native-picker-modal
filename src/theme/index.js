import Colors from './colors'
import Metrics from './metrics'

const Theme = {
  flexible: {
    flex: 1
  },
  flexDirectionRow: {
    flexDirection: 'row'
  },
  flexDirectionColumn: {
    flexDirection: 'column'
  },
  flexRow: {
    display: 'flex',
    flexDirection: 'row'
  },
  verticalContentCenter: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  horizontalCenter: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-start'
  },
  spaceBetween: {
    justifyContent: 'space-between'
  },
  smallImage: {
    height: Metrics.height * 3,
    width: Metrics.width * 3,
    resizeMode: 'contain'
  }
}

export default Theme
export { Colors, Metrics }
