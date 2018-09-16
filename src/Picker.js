import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { View, Modal, SafeAreaView } from 'react-native'
import { takeWhile, sumBy, cloneDeep, forEach, filter } from 'lodash'
import { BClose } from './component/Button'
import { List, Alpha } from './component'
import { Metrics } from './theme'
import { MSection } from './model'
import DataType, { BuiltInData } from './static'
import FilterBar from './component/Filter'
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
      /**
       * The list data for SectionList
       */
      data: [],
      /**
       * This is clone data from original `data`
       * Use for filter data when we don't want to disturb original `data`
       */
      cloneData: [],
      /**
       * The total content lenght
       * For example we have itemHeight is 50 and headerHeight is 50
       * With data is 10 sections, each section has 10 items
       * So the totalContentLength will be: 10*50 + (10*10) * 50 = 5500
       */
      totalContentLength: 0,
      /**
       * Toggle this value to show the modal
       * Check method openModal() and closeModal()
       */
      isShowModal: false
    }
  }

  componentDidMount() {
    const { data, dataType } = this.props
    let prepareData = data
    if (dataType) {
      prepareData = BuiltInData[dataType]
    }
    this.setState({
      data: prepareData,
      cloneData: prepareData,
      totalContentLength: this.createTotalContentLength(prepareData)
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

  /**
   * Return offset depends on the distance of list MSection
   * @param {Array<MSection>} distanceArrayMSection The list MSection needs to calculate offset
   * @return {Number} The offset value
   */
  calculateOffset = listMSection => {
    const { headerHeight, itemHeight } = this.props
    /**
     * Loop through the list until met the section item
     * Then calculate the offset depends on the list, data length, itemHeight  and headerHeight which is default as 50 (Check at defaultProps)
     * For example: distanceToItem is an array with 6 section data, each section data has 10 items
     * Then the offset will be (6*50) + (6*10*50) =  3300
     * When (6*50) is the offset for Headers
     * When (6*10*50) is the offset for list Items
     */
    return listMSection.length * headerHeight + sumBy(listMSection, mSection => mSection.data.length) * itemHeight
  }

  /**
   * Create offset number by calculating distance between this item with the original list data
   * @param {MSection} item The MSection item included title and list data
   * @return {Number} The new offset
   */
  createOffsetToScroll = item => {
    const { data } = this.state
    const listMSection = takeWhile(data, mSection => {
      return !Object.is(mSection.title, item.title)
    })
    return this.calculateOffset(listMSection)
  }

  /**
   * Creatre safe offset to scroll
   * @param {Number} totalCellLength The total length of items in SectionList
   * @param {Number} newOffset The new offset was calculated by #createOffsetToScroll
   *  @return {{animated?: ?boolean, offset: number}} The params for section list to scroll
   */
  createSafeOffset = newOffset => {
    const { totalContentLength } = this.state
    const { screenHeight } = Metrics
    const safeDistance = totalContentLength - newOffset
    /**
     * Calculate the gap between screenHeight and safeDistance
     * Then minus newOffset with this value
     */
    const decreaseOffset = screenHeight - safeDistance
    /**
     * Only minus newOffset when safeDistance is smaller than screenHeight
     * It means we have a big gap because screenHeight is greater than safeDistance
     * We don't have enough items to fill that's gap
     */
    if (safeDistance < screenHeight) {
      newOffset -= decreaseOffset
    }
    return {
      animated: true,
      offset: newOffset
    }
  }

  /**
   * Check if we should trigger scroll function or not
   * In case offset is smaller than screenHeight then return
   * We don't need to scroll
   * Because in this case user already inside the viewport
   * @description The offset param was extracted from `safeOffsetParams`({animated: Boolean, offset: Number})
   * @param {Number} offset The new offset was prepared for scrolling
   * @return {Boolean} The state for telling ListComponent should scroll or not.
   * True can scroll
   * False don't need to scroll
   */
  shouldWeScroll = ({ offset }) => {
    const { screenHeight } = Metrics
    return offset > screenHeight
  }

  /**
   * Create total content length depends on the list data
   * @return {Number} The total length of content it could be a large number kind of 10000 or something like that if the list items more than 200 values
   */
  createTotalContentLength = data => {
    const { headerHeight, itemHeight } = this.props
    const headerLength = data.length * headerHeight
    const itemLength = sumBy(data, mSection => mSection.data.length * itemHeight)
    return headerLength + itemLength
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
    /**
     * Create new offset depends on item distance with the rest of items in list
     */
    const newOffset = this.createOffsetToScroll(item)
    /**
     * Create safe offset to scroll
     */
    const safeOffsetParams = this.createSafeOffset(newOffset)
    /**
     * Start scrolling to the offset position
     */
    this.shouldWeScroll(safeOffsetParams) && this.listRef.scrollToOffset(safeOffsetParams)
  }

  /**
   * Should we render close button. Check closeable property
   * @return {BClose} The close button to close this modal
   */
  shouldRenderCloseButton = () => {
    const { closeable } = this.props
    return closeable && <BClose onPress={this.closeModal} />
  }

  /**
   * This function will be called when the text on FilterBar input changed
   * @param value The new text
   */
  filterBarInputChangeText = value => {
    /**
     * @param {Array<MSection>} createCloneData Array of MSection
     * We need to clone this data for using with filter
     */
    const createCloneData = cloneDeep(this.state.cloneData)
    /**
     * Create new empty array MSection
     * It will be filled by the data after passed conditions
     */
    const newMSectionArray = []
    /**
     * Loop inside the list data and compare with the conditions
     */
    forEach(createCloneData, mSection => {
      const { data } = mSection
      const newArrayData = filter(data, mItem => {
        return mItem.title.includes(value)
      })
      /**
       * Only push new data when newArrayData is greater then zero
       * Otherwise we don't need to push it to the new list data
       */
      newArrayData.length > 0 && newMSectionArray.push(new MSection(mSection.title, newArrayData))
    })
    /**
     * Set new data so SectionList and AlphaList can render again
     * Besides we need to calculate totalContentLength again
     * Because the list now is different
     */
    this.setState({
      data: newMSectionArray,
      totalContentLength: this.createTotalContentLength(newMSectionArray)
    })
  }

  /**
   * Should we render filter bar. Check filterable property
   * @return {PureComponent} The filter bar to sort the list data
   */
  shouldRenderFilterBar = () => {
    const { filterable } = this.props
    return filterable && <FilterBar onChangeText={this.filterBarInputChangeText} />
  }

  /**
   * Invoke the ref function to get reference of ListComponent
   * @param {SectionListProps} listInstance The SectionListProps
   */
  onRef = listInstance => {
    /**
     * Check if listInstance is null then return
     */
    if (!listInstance) return
    /**
     * The ref of SectionList component
     */
    this.listRef = listInstance._wrapperListRef._listRef
  }

  render() {
    const { data, totalContentLength, isShowModal } = this.state
    const {
      animationType,
      renderSectionHeader,
      renderItem,
      onSelect,
      headerHeight,
      itemHeight,
      numToRender
    } = this.props
    return (
      <Modal visible={isShowModal} transparent={false} animationType={animationType}>
        <SafeAreaView style={styles.safeAreViewContainer}>
          <View style={styles.headerActionContainer}>
            {this.shouldRenderCloseButton()}
            {this.shouldRenderFilterBar()}
          </View>
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
                numToRender={numToRender}
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
  numToRender: PropTypes.number,
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
  numToRender: 15,
  closeable: true,
  filterable: true,
  headerHeight: 50,
  itemHeight: 50
}

export default RNPicker
