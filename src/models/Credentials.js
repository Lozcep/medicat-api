require('dotenv').config()
const mongoose = require('mongoose');
const Schema = mongoose.Schema

const credentialSchema = new Schema({
    IDDoctor: String,
    email: String,
    password: String,
    createAt: { type: Date, default: Date.now },
  },  {  versionKey: false } );

const Credential = mongoose.model('Credential', credentialSchema)

module.exports = Credential
