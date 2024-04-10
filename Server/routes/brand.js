const router = require('express').Router();
const brandCtrl = require('../controllers/brand');
const { verifyAccessToken, isAdmin } = require('../middlewares/verifyToken');

router.post('/', [verifyAccessToken, isAdmin], brandCtrl.createBrand);
router.get('/', brandCtrl.getAllBrand);

router.get('/:cid', brandCtrl.getBrand);
router.put('/:cid', [verifyAccessToken, isAdmin], brandCtrl.updateBrand);
router.delete('/:cid', [verifyAccessToken, isAdmin], brandCtrl.deleteBrand);

module.exports = router;