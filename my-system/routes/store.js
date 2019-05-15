var express = require('express');
var router = express.Router();
const dataCtrl = require('../controllers/store.controller');
router.post('/register',dataCtrl.register) ;
router.post('/find',dataCtrl.find) ;

module.exports = router;
