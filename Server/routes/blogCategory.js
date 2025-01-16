const router = require('express').Router();
const blogCategoryCtrl = require('../controllers/blogCategory');
const { verifyAccessToken, isAdmin } = require('../middlewares/verifyToken');

router.post('/', [verifyAccessToken, isAdmin], blogCategoryCtrl.createBlogCategory);
router.get('/', blogCategoryCtrl.getAllBlogCategory);

router.get('/:bcid', blogCategoryCtrl.getBlogCategory);
router.put('/:bcid', [verifyAccessToken, isAdmin], blogCategoryCtrl.updateBlogCategory);
router.delete('/:bcid', [verifyAccessToken, isAdmin], blogCategoryCtrl.deleteBlogCategory);

module.exports = router;