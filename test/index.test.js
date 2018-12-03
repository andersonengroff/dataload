const test = require('tape')
const company = require('../src/domain/company')

test('ValidateFileExtensionReproved', (t) => {
  t.assert(company.validateFileExtension('X').sucess === false, 'Reproved file extension')
  t.end()
})

test('ValidateFileExtensionApproved', (t) => {
  const file = { filepath: '../text.csv', mimetype: 'text/csv' }
  console.log(file)
  t.assert(company.validateFileExtension(file).sucess === true, 'Aproved file extension')
  t.end()
})
