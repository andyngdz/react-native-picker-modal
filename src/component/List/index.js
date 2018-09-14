import React, { PureComponent } from 'react'
import { ActivityIndicator, SectionList, View } from 'react-native'
import PropTypes from 'prop-types'
import Header from './Header'
import Item from './Item'
import { MSection } from '../../model'

class List extends PureComponent {
  /**
   * Render header for section list
   */
  renderSectionHeader = section => {
    const { title } = section
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

  render() {
    const { data, renderSectionHeader = this.renderSectionHeader, renderItem = this.renderItem } = this.props
    return (
      <SectionList
        sections={data}
        renderSectionHeader={renderSectionHeader}
        renderItem={renderItem}
        ListEmptyComponent={<ActivityIndicator />}
        keyExtractor={this.keyExtractor}
      />
    )
  }
}

List.propTypes = {
  data: PropTypes.arrayOf(MSection),
  renderSectionHeader: PropTypes.func,
  renderItem: PropTypes.func
}

export default List
