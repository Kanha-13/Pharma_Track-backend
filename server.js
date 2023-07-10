const express = require('express');
const Cors = require('cors');
const product = require('./routes/product');
const stock = require('./routes/stock');
const purchase = require('./routes/purchase');
const admin = require('./routes/admin');
const vendor = require('./routes/vendor')
const billing = require('./routes/billing')
const patient = require('./routes/patient')
const settlement = require('./routes/settlement')
const users = require('./routes/user')
const cookieParser = require('cookie-parser');
const billHistory = require('./routes/billHistory');
const partyManage = require('./routes/partyPurchase');
const salePurchase = require('./routes/salePurchase');
const { connect } = require('./db/mongoose_connect');
require('dotenv').config();
//app config
const app = express();
const port = process.env.PORT || 5001;
const AllowedOrigin = process.env.ALLOWED_ORIGIN;
//middlewares
app.use(express.json());
app.use(express.static(__dirname))
app.use(Cors({ origin: AllowedOrigin, credentials: true }));
app.use(cookieParser());

//mogoose connection
connect();

// api endpoint
app.use(admin)
app.use(users)
app.use(product)
app.use(stock)
app.use(purchase)
app.use(vendor)
app.use(billHistory)
app.use(settlement)
app.use(partyManage)
app.use(salePurchase)
app.use(billing)
app.use(patient)

//listner
app.listen(port, () => console.log(`listening on localhost: ${port}`));