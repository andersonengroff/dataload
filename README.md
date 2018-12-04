# dataload - Read csv files and store data in Google Firestore

> Simple Express Backend w/ Webpack, ES6, ESLint, Hot-Reload Template

## Includes

- Webpack 3
- Babel (ES6, babel-preset-env)
- Hot-Reload
- ESLint w/ Standard
- Express
- Firestore
- Apidoc
- Fast-csv
- Tape Unit Tests

## Usage

```bash
git clone https://github.com/andersonengroff/dataload.git dataload

cd dataload

npm install

Open credentials.js and replace with your own Firestore credentials -- See How To in Create Credentials 

npm install nodemon

cd src/batch

>>> * Look src/batch/q1_catalog.csv the first csv file to store in firestore
>>> nodemon will process src/batch/index.js

# first charge
nodemon 

# build & start api
npm start

# Use Api to add website field
access http://localhost:3000/ and submit the file /uploads/q2_clientData.csv

# Use Api to get companies
access http://localhost:3000/api/company?name=WALMART
or access http://localhost:3000/api/company?zip=11200

# For Tests run
```bash
npm run test
```



## Create Credentials
create your account on https://firebase.google.com
go to console
Add new project (suggest dataload as name of project)
access Database, create a Firestore Database and after active test mode initialization
access project configuration on project overview
At services account generate a new private key, after confirm a json file was downloaded
replace the file src/credentials/credentials.js with values of json file downloaded
assure that attribute databaseURL contains your project-id Ex: 'databaseURL:': 'https://your-project-id-goes-here.firebaseio.com'


## API Documentation
see api documentation at http://localhost:3000/apidoc/

to generate documentation use

```bash
cd src
npm install apidoc -g
apidoc -f index.js -o public/apidoc
```
