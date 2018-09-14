import React, { PureComponent } from 'react'
import { Modal, SectionList } from 'react-native'
import PropTypes from 'prop-types'
import Header from './Header'
import Item from './Item'
import { MItem } from '../../model'

class List extends PureComponent {
  /**
   * Render header for section list
   */
  renderSectionHeader = section => {
    console.info(section)
  }

  /**
   * Render item for section list
   */
  renderItem = ({ item, index, section }) => {
    console.info(item, index, section)
  }

  /**
   * Create key extractor for this section list
   */
  keyExtractor = (item, index) => item + index

  render() {
    const { data, renderSectionHeader = this.renderSectionHeader, renderItem = this.renderItem } = this.props
    return (
      <SectionList
        sections={data}
        renderSectionHeader={renderSectionHeader}
        renderItem={renderItem}
        keyExtractor={this.keyExtractor}
      />
    )
  }
}

List.propTypes = {
  data: PropTypes.arrayOf(MItem),
  renderSectionHeader: PropTypes.func,
  renderItem: PropTypes.func
}

export default List
