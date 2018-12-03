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
  console.log('Entrada> ', collection, payload, companyName)
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

module.exports = {
  insertData,
  updateData,
  updateCompany,
  getCompany
}
