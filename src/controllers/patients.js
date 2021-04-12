const { response, request } = require('express');


const Patient = require("../models/Patient");

const addPatient = async (req = request, res = response) => {
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
}

const getPatients = async (req = request, res = response) => {
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
}

module.exports = {
  getPatients,
  addPatient
}
