const express = require("express");
const router = express.Router();
const { checkAuth } = require("../middleware/auth");
const {handleUserSignup,handleUserSignin, handleBookService, handleViewOrders, handleQuickQuote, handleNewInquiry} = require("../controller/user");
const {handleViewService} = require("../controller/service")

// User
router.post('/signup', handleUserSignup);
router.post('/signin', handleUserSignin);
router.get('/service', handleViewService);
router.post('/bookService', checkAuth, handleBookService);
router.get('/viewOrders', checkAuth, handleViewOrders);
router.post('/quickQuote', checkAuth, handleQuickQuote);
router.post('/newInquiry', checkAuth, handleNewInquiry);



module.exports = router;