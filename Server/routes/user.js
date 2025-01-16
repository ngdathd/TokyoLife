const router = require('express').Router();
const userCtrl = require('../controllers/user');
const { verifyAccessToken, isAdmin } = require('../middlewares/verifyToken');

router.post('/register', userCtrl.register);
router.post('/login', userCtrl.login);
router.get('/getCurrent', verifyAccessToken, userCtrl.getCurrent);

router.post('/refreshToken', userCtrl.refreshAccessToken);
router.get('/logout', verifyAccessToken, userCtrl.logout);

router.post('/forgot-password', userCtrl.forgotPassword);
router.put('/reset-password', userCtrl.resetPassword);

router.get('/', [verifyAccessToken, isAdmin], userCtrl.getUsers)

router.delete('/', [verifyAccessToken, isAdmin], userCtrl.deleteUser)

router.put('/current', verifyAccessToken, userCtrl.updateUser)
router.put('/admin/update/:uid', [verifyAccessToken, isAdmin], userCtrl.updateUserByAdmin)

router.put('/addToWishlist', verifyAccessToken, userCtrl.addToWishlist);
router.put('/deleteFromWishlist', verifyAccessToken, userCtrl.deleteFromWishlist);

router.post('/admin/create', [verifyAccessToken, isAdmin], userCtrl.addUserByAdmin);
router.get('/admin/get/:uid', [verifyAccessToken, isAdmin], userCtrl.getUserById)
module.exports = router