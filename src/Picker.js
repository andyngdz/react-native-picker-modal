import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { Modal } from 'react-native'
import { List } from './component'
import DataType, { BuiltInData } from './static'

class RNPicker extends PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      data: [],
      isShowModal: false
    }
  }

  componentDidMount() {
    const { data, dataType } = this.props
    let prepareData = data
    if (dataType) {
      prepareData = BuiltInData[dataType]
    }
    this.setState({ data: prepareData })
  }

  /**
   * Call this function to open modal
   * @return {Void} The modal will be opened
   */
  openModal = () => {
    this.setState({ isShowModal: true })
  }

  /**
   * Call this function to close modal
   * @return {Void} The modal will be closed
   */
  closeModal = () => {
    this.setState({ isShowModal: false })
  }

  render() {
    const { data, isShowModal } = this.state
    const { animationType, renderSectionHeader, renderItem, onSelect } = this.props
    return (
      <Modal visible={isShowModal} transparent={false} animationType={animationType}>
        <List data={data} renderSectionHeader={renderSectionHeader} renderItem={renderItem} onSelect={onSelect} />
      </Modal>
    )
  }
}

RNPicker.propTypes = {
  data: PropTypes.object,
  dataType: PropTypes.oneOf(DataType),
  animationType: PropTypes.string,
  renderSectionHeader: PropTypes.func,
  renderItem: PropTypes.func,
  onSelect: PropTypes.func
}

RNPicker.defaultProps = {
  animationType: 'slide',
  dataType: 'country'
}

export default RNPicker
