const bodyParser = require('body-parser');
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const { MONGO_URI } = require('./config/keys.js');

const routerProductType = require('./routes/ProductType.js');
const routerProduct = require('./routes/Product.js');

const PORT = process.env.PORT || 5000;

const app = express();

app.use(bodyParser.json());
app.use(cors());
app.use('/product-type',routerProductType);
app.use('/product', routerProduct)

mongoose.connect(MONGO_URI, {
    useCreateIndex: true,
    useNewUrlParser:true,
    useUnifiedTopology: true,
    useFindAndModify: false
}).then(() => app.listen(PORT, () => console.log(`Server run on port: ${PORT}`)))
.catch((err) => console.log('Connect fail.'));