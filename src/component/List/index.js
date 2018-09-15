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
   * @param data The section data included title
   * @return {PureComponent} Header component
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
   * @param item The item of each row
   * @param index The index of item
   * @param section The section wrap the item
   * @return {PureComponent} Item component
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
   * @param item The item of each row
   * @param index The index of item
   * @return {String} The key
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
        disableVirtualization={true}
        removeClippedSubviews={true}
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
