require("dotenv").config();
const { Schema, model } = require("mongoose");

const credentialSchema = new Schema(
  {
    IDDoctor: {
      type: Number,
    },
    IDDocument: {
      type: Number,
      required: [true, "La cédula es obligatoria"],
    },
    email: {
      type: String,
      required: [true, "El correo es obligatorio"],
      unique: true,
    },
    password: {
      type: String,
      required: [true, "La contraseña es obligatoria"],
    },
    createAt: {
      type: Date,
      default: Date.now,
    },
  },
  { versionKey: false }
);

module.exports = model("Credential", credentialSchema);
