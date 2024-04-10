const router = require('express').Router();
const blogController = require('../controllers/blog');
const { verifyAccessToken, isAdmin } = require('../middlewares/verifyToken');
const uploader = require('../configs/Cloudinary');

router.post('/', [verifyAccessToken, isAdmin], blogController.createNewBlog);
router.get('/', blogController.getAllBlog);

router.get('/:bid', blogController.getBlog);
router.put("/:bid", [verifyAccessToken, isAdmin], blogController.updateBlog);
router.delete("/:bid", [verifyAccessToken, isAdmin], blogController.deleteBlog);
router.put('/upload/:bid', [verifyAccessToken, isAdmin], uploader.single('images'), blogController.uploadImageBlog);

router.put("/like/:bid", [verifyAccessToken], blogController.likeBlog);
router.put("/dislike/:bid", [verifyAccessToken], blogController.dislikeBlog);

module.exports = router