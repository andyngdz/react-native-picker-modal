/**
 * The Item model
 * Use need to follow this class to create new array data
 */

import { Component, PureComponent } from 'react'
import { ImagePropertiesSourceOptions } from 'react-native'

class MItem {
  /**
   * The item class for data inside Section data
   * @param {ImagePropertiesSourceOptions} image The image for showing first row
   * @param {String} title The title
   * @param {String} description The description. it will be rendered below title
   * @param {Component|PureComponent} rightItem The item on the right
   */
  constructor(image, title, description, rightItem) {
    this.image = image
    this.title = title
    this.description = description
    this.rightItem = rightItem
  }
}

export default MItem
