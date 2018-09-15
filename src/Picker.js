import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { View, Modal, SafeAreaView, SectionListScrollParams } from 'react-native'
import { takeWhile, sumBy } from 'lodash'
import { List, Alpha } from './component'
import DataType, { BuiltInData } from './static'
import { MSection } from './model'
import styles from './styles'

/**
 * RNPickerModal
 * @description `The React Native Picker component package using SectionList and Alphabet`
 * @website https://github.com/itanhduy/react-native-picker
 * @by `Andy Ng`
 * @email `itc.anhduy@gmail.com`
 * @when `2018-09-15 16:17:29`
 */
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
   * Return offset depends on the distance of list MSection
   * @param {Array<MSection>} distanceArrayMSection The list MSection needs to calculate offset
   * @return {Number} The offset value
   */
  calculateOffset = distanceArrayMSection => {
    const { headerHeight, itemHeight } = this.props
    /**
     * Loop through the list until met the section item
     * Then calculate the offset depends on the list, data length, itemHeight  and headerHeight which is default as 50 (Check at defaultProps)
     * For example: distanceToItem is an array with 6 section data, each section data has 10 items
     * Then the offset will be (6*50) + (6*10*50) =  3300
     * When (6*50) is the offset for Headers
     * When (6*10*50) is the offset for list Items
     */
    return (
      distanceArrayMSection.length * headerHeight +
      sumBy(distanceArrayMSection, sectionData => sectionData.data.length) * itemHeight
    )
  }

  /**
   * Create params to use with scrollToLocation function from ListComponent
   * @param {MSection} item The MSection item included title and list data
   * @return {{animated?: ?boolean, offset: number}} The params for section list to scroll
   */
  createOffsetToScroll = item => {
    const { data } = this.state
    const distanceToItem = takeWhile(data, sectionData => {
      return !Object.is(sectionData.title, item.title)
    })
    return {
      offset: this.calculateOffset(distanceToItem)
    }
  }

  /**
   * When user click on alphabet item
   * This function will be called
   * @param {MSection} item The MSection item included title and list data
   * @return {Void} It will scroll to the offset response from #createOffsetToScroll()
   */
  onClickOnAlphaBet = item => {
    /**
     * Check if scrollToOffset is undefined then return
     * Because we can't scroll without this function
     */
    if (!this.listRef.scrollToOffset) return
    this.listComponent.scrollToOffset(this.createOffsetToScroll())
  }

  /**
   * Should we render close button. Check closeable property
   * @return {PureComponent} The close button to close this modal
   */
  shouldRenderCloseButton = () => {}

  /**
   * Should we render filter bar. Check filterable property
   * @return {PureComponent} The filter bar to sort the list data
   */
  shouldRenderFilterBar = () => {}

  /**
   * Invoke the ref function to get reference of ListComponent
   * @param {SectionListProps} listInstance The SectionListProps
   */
  onRef = listInstance => {
    /**
     * The ref of SectionList component
     */
    this.listRef = listInstance._wrapperListRef._listRef
  }

  render() {
    const { data, isShowModal } = this.state
    const { animationType, renderSectionHeader, renderItem, onSelect, headerHeight, itemHeight } = this.props
    return (
      <Modal visible={isShowModal} transparent={false} animationType={animationType}>
        <SafeAreaView style={styles.safeAreViewContainer}>
          <View style={styles.headerActionContainer} />
          <View style={styles.listContainer}>
            <View style={styles.listData}>
              <List
                data={data}
                renderSectionHeader={renderSectionHeader}
                renderItem={renderItem}
                onSelect={onSelect}
                onRef={this.onRef}
                headerHeight={headerHeight}
                itemHeight={itemHeight}
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
  onSelect: PropTypes.func,
  closeable: PropTypes.bool,
  filterable: PropTypes.bool,
  headerHeight: PropTypes.number.isRequired,
  itemHeight: PropTypes.number.isRequired
}

RNPicker.defaultProps = {
  animationType: 'slide',
  dataType: 'country',
  closeable: true,
  filterable: true,
  headerHeight: 50,
  itemHeight: 50
}

export default RNPicker
