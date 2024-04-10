const router = require('express').Router();
const productCtrl = require('../controllers/product');
const { verifyAccessToken, isAdmin } = require('../middlewares/verifyToken');
const uploader = require('../configs/Cloudinary')

router.post('/', [verifyAccessToken, isAdmin], productCtrl.createProduct);
router.get('/', productCtrl.getAllProduct);
router.put('/ratings', [verifyAccessToken], productCtrl.ratings);

router.put('/upload/:pid', [verifyAccessToken, isAdmin], uploader.array('images', 10), productCtrl.uploadImageProduct);
router.get('/:pid', productCtrl.getProduct);
router.put('/:pid', [verifyAccessToken, isAdmin], productCtrl.updateProduct);
router.delete('/:pid', [verifyAccessToken, isAdmin], productCtrl.deleteProduct);

module.exports = router