import React, { PureComponent } from 'react'
import { ActivityIndicator, SectionList, View } from 'react-native'
import { MSection } from '../../model'
import PropTypes from 'prop-types'
import { Header } from '../General'
import Item from './Item'
import styles from './styles'

class List extends PureComponent {
  /**
   * Render header for section list
   */
  renderSectionHeader = data => {
    const { headerHeight } = this.props
    const { title } = data.section
    return (
      <View style={styles.height(headerHeight)}>
        <Header title={title} />
      </View>
    )
  }

  /**
   * Render item for section list
   */
  renderItem = ({ item, index, section }) => {
    const { itemHeight } = this.props
    return (
      <View style={styles.height(itemHeight)}>
        <Item item={item} index={index} section={section} />
      </View>
    )
  }

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
        keyExtractor={this.keyExtractor}
        removeClippedSubviews={false}
      />
    )
  }
}

List.propTypes = {
  data: PropTypes.arrayOf(MSection),
  renderSectionHeader: PropTypes.func,
  renderItem: PropTypes.func,
  onRef: PropTypes.func.isRequired,
  itemHeight: PropTypes.number.isRequired,
  headerHeight: PropTypes.number.isRequired
}

export default List
