const express = require("express");
const router = express.Router();
const clientController = require("../controllers/clientController");
const authMiddleware = require("../middleware/authMiddleware");

//Main Routes 
router.get("/", authMiddleware, clientController.getIndex);
router.post("/create",authMiddleware, clientController.create);
router.delete('/delete/:id',authMiddleware, clientController.delete);
router.put('/update/:id',authMiddleware, clientController.update);

module.exports = router;