/**
 * The section data model
 * Use need to follow this class to create new array data for SectionList
 */

import MItem from './MItem'

class MSection {
  /**
   *
   * @param {String} title The title for section header
   * @param {MItem} item The item will be rendered inside section
   */
  constructor(title, item) {
    this.title = title
    this.item = item
  }
}

export default MSection
