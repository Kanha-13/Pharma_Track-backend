const mongoose = require('mongoose');
require('dotenv').config();
const connection_url = process.env.MONGODB_KA_API;


const connect = () => {
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
}
module.exports = { connect }