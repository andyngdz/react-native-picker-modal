import React, { PureComponent } from 'react'
import { FlatList } from 'react-native'
import PropTypes from 'prop-types'
import { first } from 'lodash'
import { MSection } from '../..//model'
import CircleItem from './CircleItem'
import { Header } from '../General'
import styles from './styles'

class Alpha extends PureComponent {
  /**
   * Render item for this Flatlist
   */
  renderItem = ({ item }) => {
    const { title } = item
    const firstChar = first(title)
    return <CircleItem text={firstChar} />
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
        contentContainerStyle={styles.alphaContainerStyle}
      />
    )
  }
}

Alpha.propTypes = {
  data: PropTypes.arrayOf(MSection)
}

export default Alpha
