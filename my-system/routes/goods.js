var express = require('express');
var router = express.Router();
const dataCtrl = require('../controllers/goods.controller');
/* GET users listing. */
router.post('/',dataCtrl.create);
router.post('/list',dataCtrl.list); //分页
router.get('/:id',dataCtrl.get) ;

module.exports = router;