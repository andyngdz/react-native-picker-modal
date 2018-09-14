import { map, filter, first, uniq } from 'lodash'
import { MItem, MSection } from '../model'
import { DCountry } from '../data'

const SCountry = {
  /**
   * Return the country data
   * @return {Array<MSection>} Array of MSection
   */
  data: () => {
    const alphabet = []
    // Create list MItem
    const listMItem = map(DCountry, (item, key) => {
      alphabet.push(first(key))
      return new MItem(key, item.flag, item.common, String(), item.callingCode)
    })
    // Create alphabet depends on listMItem key
    const uniqueAlphaBet = uniq(alphabet)
    // Create temp list MSection data without item. We will assign later
    const listMSection = map(uniqueAlphaBet, char => {
      return new MSection(
        char,
        filter(listMItem, (item, key) => {
          return first(item.id) === char
        })
      )
    })
    return listMSection
  }
}

export default SCountry
