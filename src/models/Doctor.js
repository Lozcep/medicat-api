require('dotenv').config()
const mongoose = require('mongoose');
const Schema = mongoose.Schema

const doctorSchema = new Schema({
    firstName: String,
    lastName: String,
    specialty: String,
    IDDocument: Number,
    location: {
        type: { type: String },
        coordinates: []
       },
    createAt: { type: Date, default: Date.now },
  },  {  versionKey: false } );

doctorSchema.index({ location: "2dsphere" }) 

const Doctor = mongoose.model('Doctor', doctorSchema)

module.exports = Doctor
