const admin = require('firebase-admin')
const serviceAccount = require('../credentials/credentials')
const extractCsv = require('../domain/extractCsv')
const inputFilePath = '../batch/files/q1_catalog.csv'

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: serviceAccount.databaseURL
})


const db = admin.firestore()

const docRef = db.collection('companies')

const saveData = (id, companyName, zipCode) => {
  docRef.doc(id).set({id, companyName, zipCode})
}

const getAndSaveParams = (params) => {
  params.map((item) =>  saveData(item[0], item[1], item[2]))
}

extractCsv.parser(inputFilePath, getAndSaveParams)









