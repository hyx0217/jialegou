var express = require('express');
var router = express.Router();
const dataCtrl = require('../controllers/order.controller');
router.post('/',dataCtrl.create) ;
router.post('/listBy',dataCtrl.listBy) ;

router.post('/getorder',dataCtrl.list);
router.put('/:id',dataCtrl.update);
router.delete('/:id',dataCtrl.delorder)

module.exports = router;
