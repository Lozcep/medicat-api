const { Router } = require("express");

const authToken = require("../middlewares/authToken");

const { getPatients, addPatient } = require("../controllers/patients");

const router = Router();

router.get("/patient", authToken, getPatients);

router.post("/patient", authToken, addPatient);

module.exports = router;
