import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { View, Modal, SafeAreaView, SectionListScrollParams } from 'react-native'
import { findIndex } from 'lodash'
import { List, Alpha } from './component'
import DataType, { BuiltInData } from './static'
import { MSection } from './model'
import styles from './styles'

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

  /**
   * Create params to use with scrollToLocation function from ListComponent
   * @param {MSection} item The MSection item included title and list data
   * @return {SectionListScrollParams} The params for section list scroll
   */
  createPositionToScroll = item => {
    const { data } = this.state
    const sectionIndex = findIndex(data, { title: item.title })
    return {
      animated: true,
      sectionIndex,
      itemIndex: 0,
      viewPosition: 0
    }
  }

  /**
   * When user click on alphabet item
   * This function will be called
   * @param {MSection} item The MSection item included title and list data
   */
  onClickOnAlphaBet = item => {
    this.listComponent.scrollToLocation(this.createPositionToScroll(item))
  }

  render() {
    const { data, isShowModal } = this.state
    const { animationType, renderSectionHeader, renderItem, onSelect } = this.props
    return (
      <Modal visible={isShowModal} transparent={false} animationType={animationType}>
        <SafeAreaView style={styles.safeAreViewContainer}>
          <View style={styles.listContainer}>
            <View style={styles.listData}>
              <List
                data={data}
                renderSectionHeader={renderSectionHeader}
                renderItem={renderItem}
                onSelect={onSelect}
                onRef={listComponent => (this.listComponent = listComponent)}
              />
            </View>
            <View style={styles.listAlpha}>
              <Alpha data={data} onClick={this.onClickOnAlphaBet} />
            </View>
          </View>
        </SafeAreaView>
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
