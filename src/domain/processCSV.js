
const extractCsv = require('./extractCsv')
const firestore = require('../firestore')

const getAndInsertParams = (params) => {
  params.map((item) => {
    const collection = 'companies'

    // TODO dynamic desestructure array to json object
    const id = item[0]
    const companyName = item[1]
    const zipCode = item[2]

    const payload = {id, companyName, zipCode}

    console.log(collection, payload)

    firestore.insertData(collection, payload)
  })
}

const getParamsAndUpdate = (params) => {
  params.map((item) => {
    const collection = 'companies'

    // TODO dynamic desestructure array to json object
    const companyName = item[0].toUpperCase()
    let zipCode = item[1].toString().substr(0, 5)
    //zipCode = zipCode.lenght > 5 ? zipCode.substr(1, 5) : zipCode
    const website = item[2].toLowerCase()

    console.log('zip>>>>>>>>>>>', zipCode, zipCode.length, zipCode.lenght > 5, zipCode.substr(1, 5))
    const payload = {companyName, zipCode, website}

    firestore.updateCompany(collection, payload)

  })
}

const processCSVandInsert = (inputFilePath) => {
  extractCsv.parser(inputFilePath, getAndInsertParams)
}

const processCSVandUpdate = (inputFilePath) => {
  extractCsv.promiseParser(inputFilePath)
    .then(rst => { rst.shift()
      getParamsAndUpdate(rst) })
}


module.exports = {
  processCSVandInsert,
  processCSVandUpdate
}










