const express = require("express");
const router = express.Router();
const authToken = require("../middlewares/authToken");

const Doctor = require("../models/Doctor");
const Patient = require("../models/Patient");

router.post("/", authToken, async (req, res) => {
  try {
    let patient = {
      doctorId: req.doctorId,
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      IDDocument: req.body.IDDocument,
      birthday: req.body.birthday,
      sex: req.body.sex,
      about: req.body.about || "",
    };

    const newPatient = await new Patient(patient).save();

    res.status(201).json({
      status: 201,
      message: "Paciente creado",
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({
      status: 400,
      message: "Hubo un error al registrar paciente",
      patient: newPatient,
    });
  }
});

router.get("/", authToken, async (req, res) => {
  try {
    const patients = await Patient.find({ doctorId: req.doctorId });

    res.status(200).json({
      status: 200,
      message: "Pacientes encontrados",
      data: { patients },
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({
      status: 400,
      message: "Hubo un error al buscar los pacientes",
    });
  }
});

module.exports = router;
