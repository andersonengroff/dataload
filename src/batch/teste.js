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

const payload = { companyName: 'Walmart', zipCode: '82300440', website: 'walmart.com' }
//const getData = async () => {
firestore.updateCompany('companies', payload)
//}

//getData().then(x => { console.log('x', x) })
