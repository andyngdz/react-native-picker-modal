import React, { PureComponent } from 'react'
import { ActivityIndicator, SectionList, View } from 'react-native'
import { sumBy } from 'lodash'
import PropTypes from 'prop-types'
import { MSection } from '../../model'
import { Header } from '../General'
import { NumToRenderType } from '../../static'
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

  /**
   * Return number to render
   * @return {Number} Return how many items should be render at the first time.
   * Render full values will help scroller better but not food for performance
   * If the list data has more than 1000 items. Should not use `full`, use specific number instead. Suggest 10-50
   */
  initialNumToRender = () => {
    const { numToRender, data } = this.props
    if (Number.isSafeInteger(numToRender)) {
      return numToRender
    }
    return sumBy(data, mSection => mSection.data.length)
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
        keyExtractor={this.keyExtractor}
        initialNumToRender={this.initialNumToRender()}
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
  headerHeight: PropTypes.number.isRequired,
  numToRender: PropTypes.oneOf(NumToRenderType).isRequired
}

export default List
