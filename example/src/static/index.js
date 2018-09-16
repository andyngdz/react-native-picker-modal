import SCountry from './SCountry'
import Error from './Error'

const DataType = ['country']

const BuiltInData = {
  country: SCountry.data()
}

export default DataType
export { BuiltInData, SCountry, Error }
