const router = require('express').Router();
const couponController = require('../controllers/coupon');
const { verifyAccessToken, isAdmin } = require('../middlewares/verifyToken');

router.post('/', [verifyAccessToken, isAdmin], couponController.createNewCoupon);
router.get('/', couponController.getAllCoupon);
router.get('/:cpid', couponController.getCoupon);
router.put('/:cpid', [verifyAccessToken, isAdmin], couponController.updateCoupon);
router.delete('/:cpid', [verifyAccessToken, isAdmin], couponController.deleteCoupon)

module.exports = router;