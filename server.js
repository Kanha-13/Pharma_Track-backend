const express = require('express');
const Cors = require('cors');
const product = require('./routes/product');
const admin = require('./routes/admin');
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
app.use(billHistory)
app.use(partyManage)
app.use(salePurchase)

//listner
app.listen(port, () => console.log(`listening on localhost: ${port}`));