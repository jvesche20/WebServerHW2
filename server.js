const Express = require('express');
const BodyParser = require('body-parser');
const Mongoose = require('mongoose');

// const Product = require('./models/product');
// const User = require('./models/user');
const getUser = require('./controllers/user.controllers');

const deleteUserSSNs = require('./controllers/user.controllers');
const postUsers = require('./controllers/user.controllers');
const putUsers = require('./controllers/user.controllers');
const getUserSSNs = require('./controllers/user.controllers');
const userPatches = require('./controllers/user.controllers');
const deleteUsers = require('./controllers/user.controllers');

const getProducts = require('./controllers/products.controllers');
const deleteProductSKUs = require('./controllers/products.controllers');
const postProducts = require('./controllers/products.controllers');
const putProducts = require('./controllers/products.controllers');
const getProductSKUs = require('./controllers/products.controllers');
const productPatches = require('./controllers/products.controllers');
const deleteProducts = require('./controllers/products.controllers');

const app = Express();

app.use(BodyParser.json());

// const doActionThatMightFailValidation = require('./failValidation/failValidation');

app.get('/products', getProducts.getProduct);
app.get('/users', getUser.getUsers);
app.get('/products/:sku', getProductSKUs.getProductSKU);
app.get('/users/:ssn', getUserSSNs.getUsersSSN);

app.post('/products', postProducts.postProduct);
app.post('/users', postUsers.postUser);

app.delete('/products', deleteProducts.deleteProduct);
app.delete('/users', deleteUsers.deleteUser);
app.delete('/products/:sku', deleteProductSKUs.deleteProductSKU);
app.delete('/users/:ssn', deleteUserSSNs.deleteUserSSN);

app.put('/products/:sku', putProducts.putProduct);
app.put('/users/:ssn', putUsers.putUser);

app.patch('/products/:sku', productPatches.productPatch);
app.patch('/users/:ssn', userPatches.userPatch);

(async () => {
  await Mongoose.connect('mongodb+srv://admin:admin@cluster0.cgc8h.mongodb.net/Cluster0?retryWrites=true&w=majority', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true,
  });
  app.listen(8000);
})();
