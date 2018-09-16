import { StyleSheet } from 'react-native'

/**
 * Create height for item and header
 * @param {Number} h The height of item or header
 * @return {StyleSheet.create({ height: h })} The header property
 */
const createHeight = h => StyleSheet.create({ height: h })

export { createHeight }
