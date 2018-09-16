import React, { PureComponent } from 'react'
import { FlatList, TouchableOpacity } from 'react-native'
import PropTypes from 'prop-types'
import { first } from 'lodash'
import { MSection } from '../..//model'
import CircleItem from './CircleItem'
import styles from './styles'

class Alpha extends PureComponent {
  /**
   * Render item for this Flatlist
   */
  renderItem = ({ item }) => {
    const { title } = item
    const firstChar = first(title)
    return (
      <TouchableOpacity onPress={() => this.clickOnCircleItem(item)}>
        <CircleItem text={firstChar} />
      </TouchableOpacity>
    )
  }

  /**
   * When user click on circle item
   * We move to the section
   * @param item The item content information for finding section
   */
  clickOnCircleItem = item => {
    const { onClick } = this.props
    onClick(item)
  }

  /**
   * Create key extractor for this section list
   */
  keyExtractor = (item, index) => item + index

  render() {
    const { data } = this.props
    return (
      <FlatList
        data={data}
        renderItem={this.renderItem}
        keyExtractor={this.keyExtractor}
        contentContainerStyle={styles.containerStyle}
      />
    )
  }
}

Alpha.propTypes = {
  onClick: PropTypes.func.isRequired,
  data: PropTypes.arrayOf(PropTypes.instanceOf(MSection)).isRequired
}

export default Alpha
