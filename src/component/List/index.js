import React, { PureComponent } from 'react'
import { ActivityIndicator, SectionList } from 'react-native'
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
