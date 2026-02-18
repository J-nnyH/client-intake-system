const express = require("express");
const router = express.Router();
const clientController = require("../controllers/clientController");

//Main Routes 
router.get("/", clientController.getIndex);
router.post("/create", clientController.create);
router.delete('/delete/:id',clientController.delete)
router.put('/update/:id',clientController.update)

module.exports = router;