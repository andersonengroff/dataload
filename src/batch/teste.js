//const processCSV = require('../domain/processCSV')
//const extractCSV = require('../domain/extractCsv')
const firestore = require('../firestore')

// const filePath = '../../uploads/teste.csv'

// const getRst = async (filePath) => {
//   const rst = await extractCSV.promiseParser(filePath).then(records => { return records })
//   console.log(rst)
//   return rst
// }

// getRst(filePath).then(rst => console.log(rst))

//processCSV.processCSV('../uploads/teste.csv')

//const payload = { companyName: 'COCA COLA', zipCode: '82300440', website: 'cocacola.com' }
//const getData = async () => {
//const rst = Promise.resolve(firestore.getData('companies', payload)).then(rst => console.log('promise', rst))
//console.log(rst)
//}

//getData().then(x => { console.log('x', x) })

const t = async () => {
  const a = await Promise.resolve(firestore.getCompanyByName('COCA COLA'))
  console.log(a)
}

//t()

//Promise.resolve(firestore.getCompanyByName('COCA COLA')).then(rst => console.log('name', rst))
//Promise.resolve(firestore.getCompanyByZipCode('82300')).then(rst => console.log('zip', rst))

const getCompany2 = async (companyName = '', zipCode = '') => {
  const byName = await Promise.resolve(firestore.getCompanyByName(companyName))
  console.log(byName)
  const byZip = await Promise.resolve(firestore.getCompanyByZipCode(zipCode))
  console.log(byZip)
  return byName.concat(byZip)
}

const getCompany = async (companyName = '', zipCode = '') => {
  const byName = await Promise.resolve(firestore.getCompanyByName(companyName))
  const byZip = await Promise.resolve(firestore.getCompanyByZipCode(zipCode))
  return byName.id !== undefined ? byName : byZip
}


getCompany('', '82560').then(rst => { console.log(rst) })

