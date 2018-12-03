
const processCSV = require('./processCSV')
const extractCsv = require('./extractCsv')
const firestore = require('../firestore')

let msg = 'Sucesso'

const validateFileExtension = (file) => {
  console.log('mimetype', file.mimetype)
  if (file.mimetype !== 'text/csv') {
    msg = 'Arquivo não é um csv'
    return {msg, sucess: false}
  }
  return  {msg, sucess: true}
}

const validateStructure = async (params) => {
  console.log('validate', params[0], params[1], params[2])
  if (!(params[0] === 'Name' && params[1] === 'Zip' && params[2] === 'Website') || params.length !== 3) {
    console.log(params, params.length)
    msg = 'Informe as colunas Name, Zip e Website no arquivo'
    return {msg, sucess: false}
  }
  return  {msg, sucess: true}
}

const validateFileStructure = async (file) => (
  extractCsv.promiseParser(file.path)
    .then(data => {
      return validateStructure(data[0])
        .then(rst => {
          return rst
        })
    })
)

const update = async (file) => {

  const validateExtension =  validateFileExtension(file)
  if (!validateExtension.sucess) return validateExtension

  const validStructure = await validateFileStructure(file).then(valid => { return (valid) })
  console.log('validstructure', validStructure)
  if (!validStructure.sucess) return validStructure

  try {
    processCSV.processCSVandUpdate(file.path)
    return {msg: 'Updated', sucess: true}
  } catch (err) {
    console.log(err)
    return {msg: 'Update failed', sucess: false}
  }
}

const getCompany = (name, zip, callback) => {
  const collection = 'companies'
  firestore.getCompany(collection, name, zip, callback)
}

module.exports = {
  update,
  getCompany,
  validateFileExtension
}




