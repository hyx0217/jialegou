var express = require('express');
var router = express.Router();
const dataCtrl = require('../controllers/user.controller');
/* GET users listing. */
router.get('/:id',dataCtrl.get) ;
router.post('/',dataCtrl.create) ;
router.put('/address/:id',dataCtrl.address)
router.put('/cates/:id',dataCtrl.cates)
router.put('/editcates/:id',dataCtrl.editcates)


module.exports = router;
