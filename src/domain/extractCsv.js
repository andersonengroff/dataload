const csv = require('fast-csv')
const fs = require('fs')
const results = []

const parser = (filepath, callback) => {
  fs.createReadStream(filepath)
    .pipe(csv())
    .on('data', (data) => {
      results.push(data)
    })
    .on('end', () => {
      results.shift()
      console.log(results)
      callback(results)
    })
}

//TODO use options to get only header
const getHeader = (filepath, callback) => {
  fs.createReadStream(filepath)
    .pipe(csv())
    .on('data', (data) => {
      results.push(data)
    })
    .on('end', () => {
      console.log(results)
      callback(results[0])
    })
}

const promiseParser = (filepath, options) => {
  console.log('Promise Parser file >> ', filepath)
  return new Promise((resolve, reject)  => {
    let records = []
    try {
      csv
        .fromPath(filepath, options)
        .on('data', (record) => {
          records.push(record)
        })
        .on('end', () => {
          resolve(records)
        })
    } catch (error) {
      console.error(error)
      reject(new Error('Failed to parse csv'))
    }

  })
}

module.exports = {
  parser,
  getHeader,
  promiseParser
}
