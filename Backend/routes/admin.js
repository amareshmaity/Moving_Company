const express = require("express");
const router = express.Router();
const { checkAuth } = require("../middleware/auth");
const {handleAdminSignup, handleAdminSignin, handleAddService, handleViewOrder, handleViewOrderDetails, handleViewQuote, handleViewMessage} = require("../controller/admin");
const { handleViewService } = require("../controller/service")
// Admin
router.post('/signup', handleAdminSignup);
router.post('/signin', handleAdminSignin);
router.post('/addService', checkAuth, handleAddService);
router.get('/service', handleViewService);
router.get('/viewOrder', handleViewOrder);
router.post('/viewOrderDetails', handleViewOrderDetails);
router.get('/viewQuote', handleViewQuote);
router.get('/viewMessage', handleViewMessage);


module.exports = router;