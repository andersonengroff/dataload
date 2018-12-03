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

/**
 * @api {get} /api/company?name=:name&zip=:zip Request company by name or zip
 * @apiName getCompany
 * @apiGroup Company
 *
 * @apiParam {String} name Company full complete name
 * @apiParam {String} zip ZipCode zip code associate to company
 *
 * @apiSuccess {String} id identification code of company
 * @apiSuccess {String} companyName  the full name of company
 * @apiSuccess {String} zipCode  the zip code of company
 * @apiSuccess {String} website  the website url of company
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *    {
 *      id: "1",
 *      companyName: "COCA COLA",
 *      zipCode: "82560",
 *      website: "www.cocacola.com.br"
 *    }
 *
 */
app.get('/api/company', (req, res)  => {
  const name = req.query.name
  const zip = req.query.zip

  company.getCompany(name, zip).then(company => { res.send(company) })

})


/**
 * @api {post} /upload
 * @apiName uploadFile
 * @apiGroup Company
 *
 * @apiParam {File} file with mimeType text/csv

 *
 * @apiSuccess {String} Upload realizado com sucesso
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *     <h2>Upload realizado com sucesso</h2>
 *
 * @apiError error description of error
 * @apiErrorExample {json} Error-Response:
 *     HTTP/1.1 403 Not Found
 *     {
 *       "error": "Informe as colunas Name, Zip e Website no arquivo"
 *     }
 */
app.post('/upload', upload.single('file'), (req, res) => {
  console.log('Upload csv')

  let file = req.file

  company.update(file)
    .then((update) => {
      if (!update.sucess) {
        res.status(403).send({error: update.msg})
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
