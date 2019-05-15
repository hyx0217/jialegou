var express = require('express');
var router = express.Router();
const dataCtrl = require('../controllers/seller.controller');
router.post('/login',dataCtrl.login) ;
router.post('/register',dataCtrl.register) ;


module.exports = router;
