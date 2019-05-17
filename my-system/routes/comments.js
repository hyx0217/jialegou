var express = require('express');
var router = express.Router();
const dataCtrl = require('../controllers/comments.controller');
/* GET users listing. */
router.post('/',dataCtrl.create);
router.get('/list/:id',dataCtrl.list) ;


module.exports = router;