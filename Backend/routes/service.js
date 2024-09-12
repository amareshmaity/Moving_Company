const express = require("express");
const router = express.Router();
const {handleViewService} = require("../controller/service");

// Admin
router.get('/', handleViewService);

module.exports = router;