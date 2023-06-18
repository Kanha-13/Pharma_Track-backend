const express = require('express');
const mongoose = require('mongoose');
const Cors = require('cors');
const product = require('./routes/product');
const admin = require('./routes/admin');
const users = require('./routes/user')
const cookieParser = require('cookie-parser');
const billHistory = require('./routes/billHistory');
const partyManage = require('./routes/partyPurchase');
const salePurchase = require('./routes/salePurchase');
require('dotenv').config();
//app config
const app = express();
const port = process.env.PORT || 5001;
const AllowedOrigin = process.env.ALLOWED_ORIGIN;
const connection_url = process.env.MONGODB_KA_API;
//middlewares
app.use(express.json());
app.use(express.static(__dirname))
app.use(Cors({ origin: AllowedOrigin, credentials: true }));
app.use(cookieParser());
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');

//mongo connection
mongoose.connect(connection_url, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
}).then(() => {
    console.log("Connected to DB")
}).catch(err => {
    console.log(err)
})

// api endpoint
app.use(admin)
app.use(users)
app.use(product)
app.use(billHistory)
app.use(partyManage)
app.use(salePurchase)

//listner
app.listen(port, () => console.log(`listening on localhost: ${port}`));