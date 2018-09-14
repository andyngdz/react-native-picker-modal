import React, { PureComponent } from 'react'
import { Modal } from 'react-native'
import PropTypes from 'prop-types'
import { List } from './component'

class RNPicker extends PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      data: [],
      isShowModal: false
    }
  }

  componentDidMount() {
    const { data } = this.props
    this.setState({
      data
    })
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
    const { renderSectionHeader, renderItem, onSelect, animationType } = this.props
    return (
      <Modal visible={isShowModal} transparent={false} animationType={animationType}>
        <List data={data} renderSectionHeader={renderSectionHeader} renderItem={renderItem} onSelect={onSelect} />
      </Modal>
    )
  }
}

RNPicker.propTypes = {
  animationType: PropTypes.string,
  renderSectionHeader: PropTypes.func,
  renderItem: PropTypes.func,
  onSelect: PropTypes.func
}

RNPicker.defaultProps = {
  animationType: 'slide'
}

export default RNPicker
