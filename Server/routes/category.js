const router = require('express').Router();
const categoryCtrl = require('../controllers/category');
const { verifyAccessToken, isAdmin } = require('../middlewares/verifyToken');

router.post('/', [verifyAccessToken, isAdmin], categoryCtrl.createCategory);
router.get('/', categoryCtrl.getAllCategory);

router.get('/:cid', categoryCtrl.getCategory);
router.put('/:cid', [verifyAccessToken, isAdmin], categoryCtrl.updateCategory);
router.delete('/:cid', [verifyAccessToken, isAdmin], categoryCtrl.deleteCategory);

module.exports = router;