# express-boilerplate

> Simple Express Backend w/ Webpack, ES6, ESLint, Hot-Reload Template

## Includes

- Webpack 3
- Babel (ES6, babel-preset-env)
- Hot-Reload
- ESLint w/ Standard
- Express
- Firestore

## Usage

```bash
git clone https://github.com/andersonengroff/dataload.git

cd dataload

npm install

# hot reload
npm run dev

# build
npm run build

# build & start
npm start

# test
npm run test

```

## API Documentation
to see apidocumentation see http://localhost:3000/apidoc/
to generate use

```bash
cd src
npm install apidoc -g
apidoc -f index.js -o public/apidoc
```