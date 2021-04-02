require("dotenv").config();
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const patientSchema = new Schema(
  {
    doctorId: String,
    firstName: String,
    lastName: String,
    IDDocument: Object,
    birthday: Date,
    sex: String,
    about: String,
    createAt: { type: Date, default: Date.now },
  },
  { versionKey: false }
);

const Patient = mongoose.model("Patient", patientSchema);

module.exports = Patient;
