/**
 * The section data model
 * Use need to follow this class to create new array data for SectionList
 */

import MItem from './MItem'

class MSection {
  /**
   *
   * @param {String} title The title for section header
   * @param {Array<MItem>} data The item will be rendered inside section
   */
  constructor(title, data) {
    this.title = title
    this.data = data
  }
}

export default MSection
