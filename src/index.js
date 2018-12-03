import express from 'express'
import chalk   from 'chalk'
import path    from 'path'
import config  from './config'

const company = require('./domain/company')

const multer = require('multer')

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/')
  },
  filename: function (req, file, cb) {
    cb(null, `${file.originalname}-${Date.now()}.${path.extname(file.originalname)}`)
  }
})

// utiliza a storage para configurar a instância do multer
const upload = multer({ storage })

const app = express()

app.use(express.static('public'))

app.get('/api/company', (req, res)  => {
  const name = req.query.name
  const zip = req.query.zip
  const sendCompany = (company) => (
    res.send(company)
  )

  console.log('chamando firestore', name, zip)
  company.getCompany(name, zip, sendCompany)

})

app.post('/upload', upload.single('file'), (req, res) => {
  console.log('Upload csv')

  let file = req.file

  company.update(file)
    .then((update) => {
      if (!update.sucess) {
        res.status(403).send(update.msg)
      } else {
        res.send('<h2>Upload realizado com sucesso</h2>')
      }
    })


})

app.listen(config.PORT, () => {
  const log = console.log
  log('\n')
  log(chalk.bgGreen.black(`Server listening on http://localhost:${config.PORT}/ ..`))
  log('\n')

  log(`${chalk.blue('Much fun! :)')}`)
  log('\n')
})

export default app
