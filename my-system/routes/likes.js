var express = require('express');
var router = express.Router();
const dataCtrl = require('../controllers/likes.controller');
/* GET users listing. */
router.post('/',dataCtrl.create);
router.post('/list',dataCtrl.list) ;
router.delete('/:id',dataCtrl.delete) ;

module.exports = router;