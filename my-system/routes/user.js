var express = require('express');
var router = express.Router();
const dataCtrl = require('../controllers/seller.controller');
/* GET users listing. */
router.get('/:id',dataCtrl.get) ;

module.exports = router;
