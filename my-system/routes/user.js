var express = require('express');
var router = express.Router();
const dataCtrl = require('../controllers/user.controller');
/* GET users listing. */
router.get('/:id',dataCtrl.get) ;

module.exports = router;
