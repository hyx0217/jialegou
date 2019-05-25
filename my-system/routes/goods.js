var express = require('express');
var router = express.Router();
const dataCtrl = require('../controllers/goods.controller');
/* GET users listing. */
router.post('/',dataCtrl.create);
router.post('/list',dataCtrl.list); //分页
router.post('/listBySell',dataCtrl.listBySell) ;

router.get('/:id',dataCtrl.get) ;
router.get('/listByStore/:parentId',dataCtrl.listByStore) ;
router.get('/listByNone/:parentId',dataCtrl.listByNone) ;


router.put('/:id',dataCtrl.update)
router.delete('/:id',dataCtrl.delete)
router.post('/search',dataCtrl.search)


module.exports = router;