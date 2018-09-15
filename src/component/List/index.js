import React, { PureComponent } from 'react'
import { ActivityIndicator, SectionList, LayoutChangeEvent } from 'react-native'
import sectionListGetItemLayout from 'react-native-section-list-get-item-layout'
import { MSection } from '../../model'
import PropTypes from 'prop-types'
import { Header } from '../General'
import Item from './Item'

class List extends PureComponent {
  /**
   * Render header for section list
   */
  renderSectionHeader = data => {
    const { title } = data.section
    return <Header title={title} />
  }

  /**
   * Render item for section list
   */
  renderItem = ({ item, index, section }) => {
    return <Item item={item} index={index} section={section} />
  }

  /**
   * Use to get layout of Item component
   * @param {LayoutChangeEvent} event The layout event included height, width, etc..
   */
  getItemLayout = sectionListGetItemLayout({
    // The height of the row with rowData at the given sectionIndex and rowIndex
    getItemHeight: (rowData, sectionIndex, rowIndex) => (sectionIndex === 0 ? 100 : 50),
    // These four properties are optional
    getSeparatorHeight: () => 1 / PixelRatio.get(), // The height of your separators
    getSectionHeaderHeight: () => 20, // The height of your section headers
    getSectionFooterHeight: () => 10, // The height of your section footers
    listHeaderHeight: 40 // The height of your list header
  })

  /**
   * Create key extractor for this section list
   */
  keyExtractor = (item, index) => item + index

  render() {
    const { data, renderSectionHeader = this.renderSectionHeader, renderItem = this.renderItem, onRef } = this.props
    return (
      <SectionList
        ref={onRef}
        sections={data}
        renderSectionHeader={renderSectionHeader}
        renderItem={renderItem}
        ListEmptyComponent={<ActivityIndicator />}
        initialScrollIndex={50}
        initialNumToRender={2}
        getItemLayout={this.getItemLayout}
        keyExtractor={this.keyExtractor}
      />
    )
  }
}

List.propTypes = {
  data: PropTypes.arrayOf(MSection),
  renderSectionHeader: PropTypes.func,
  renderItem: PropTypes.func,
  onRef: PropTypes.func.isRequired
}

export default List
