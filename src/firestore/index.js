const admin = require('firebase-admin')
const serviceAccount = require('../credentials/credentials')

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: serviceAccount.databaseURL
})

const db = admin.firestore()


const insertData = (collection, payload) => {
  console.log(collection, payload)
  const docRef = db.collection(collection)
  docRef.doc(payload.id).set({payload})
}

const updateData = (collection, payload) => {
  const { id } = payload
  console.log(collection, payload, id)
  const docRef = db.collection(collection)
  docRef.doc(id).update(payload)
}

const updateCompany = (collection, payload) => {
  const { companyName } = payload

  const docRef = db.collection(collection)
  const query = docRef.where('companyName', '==', companyName).get()

  query.then(snapshot => {
    if (snapshot.empty) return
    snapshot.forEach(doc => {
      //console.log(doc.id, '=>', doc.data())
      payload.id = doc.id
      updateData(collection, payload)
    })
  })

}

const getCompany = (collection, name, zip, callback) => {

  // TODO very very limited search, firestore doesn't search fulltext, elasticSearch, Algolia, Splunk, BigQuery can do a better work
  // see https://firebase.google.com/docs/firestore/solutions/search?hl=pt-br how to implement Algolia with functions
  const docRef = db.collection(collection)

  const searchZip = (queryZip) => {
    queryZip.get().then(snapshot => {
      if (snapshot.empty) callback()
      snapshot.forEach(doc => {
        console.log(doc.id, '=>', doc.data())
        callback(doc.data())
      })
    })
  }

  const searchName = (queryName) => {
    queryName.get().then(snapshot => {
      if (snapshot.empty) callback()
      snapshot.forEach(doc => {
        console.log(doc.id, '=>', doc.data())
        callback(doc.data())
      })
    })
  }

  if (name) {
    const query = docRef.where('companyName', '==', name)
    searchName(query)
  } else {
    const query = docRef.where('zipCode', '==', zip)
    if (zip) searchZip(query)
  }

}

const getCompanyByName = async (companyName) => {
  const collection = 'companies'
  const docRef = db.collection(collection)

  // TODO very very limited search, firestore doesn't search fulltext, elasticSearch, Algolia, Splunk, BigQuery can do a better work
  // see https://firebase.google.com/docs/firestore/solutions/search?hl=pt-br how to implement Algolia with functions
  const queryEquals = docRef.where('companyName', '==', companyName).get()

  let company = {}

  await queryEquals.then(snapshot => {
    snapshot.forEach(doc => {
      //console.log(doc.id, '=>', doc.data())
      const { id } = doc
      const { companyName, zipCode, website } = doc.data()
      company = { id, companyName, zipCode, website }

    })
  })

  return company
}

const getCompanyByZipCode = async (zipCode) => {
  const collection = 'companies'
  const docRef = db.collection(collection)
  const queryEquals = docRef.where('zipCode', '==', zipCode).get()

  let company = {}

  await queryEquals.then(snapshot => {
    snapshot.forEach(doc => {
      //console.log(doc.id, '=>', doc.data())
      const { id } = doc
      const { companyName, zipCode, website } = doc.data()
      company = { id, companyName, zipCode, website }
    })
  })

  return company
}

const getData = async (collection, payload) => {
  const { companyName } = payload
  console.log('Entrada> ', collection, payload, companyName)
  const docRef = db.collection(collection)
  const query = docRef.where('companyName', '==', companyName).get()

  const data = []

  await query.then(snapshot => {
    if (snapshot.empty) return
    snapshot.forEach(doc => {
      //console.log(doc.id, '=>', doc.data())
      const { id } = doc
      const { companyName, zipCode, website } = doc.data()

      data.push({ company : { id, companyName, zipCode, website } })

    })
  })

  console.log(data)
  return data
}

module.exports = {
  insertData,
  updateData,
  updateCompany,
  getCompany,
  getData,
  getCompanyByName,
  getCompanyByZipCode
}
