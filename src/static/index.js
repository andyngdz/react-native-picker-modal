import SCountry from './SCountry'

const DataType = ['country']
const NumToRenderType = ['full', Number]

const BuiltInData = {
  country: SCountry.data()
}

export default DataType
export { BuiltInData, NumToRenderType, SCountry }
