import React, { PureComponent } from 'react'
import { ActivityIndicator, SectionList, SectionListScrollParams } from 'react-native'
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
   * Create key extractor for this section list
   */
  keyExtractor = (item, index) => item + index

  /**
   * Get itemLayout for using scrollToLocation
   * @return {SectionListScrollParams} Return the sectionListScrollParams
   */
  getItemLayout = (data, index) => {
    const { itemHeight } = this.props
    return sectionListGetItemLayout({
      getItemHeight: (rowData, sectionIndex, rowIndex) => (sectionIndex === 0 ? itemHeight * 2 : itemHeight)
    })
  }

  render() {
    const { data, renderSectionHeader = this.renderSectionHeader, renderItem = this.renderItem, onRef } = this.props
    return (
      <SectionList
        ref={onRef}
        sections={data}
        renderSectionHeader={renderSectionHeader}
        renderItem={renderItem}
        ListEmptyComponent={<ActivityIndicator />}
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
  onRef: PropTypes.func.isRequired,
  itemHeight: PropTypes.number.isRequired
}

export default List
