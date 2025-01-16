const BlogCategory = require('../models/blogCategory');
const asyncHandler = require('express-async-handler');

const createBlogCategory = asyncHandler(async (req, res) => {
    const newBlogCategory = await BlogCategory.create(req.body);
    return res.status(200).json({
        success: newBlogCategory ? true : false,
        newBlogCategory: newBlogCategory ? newBlogCategory : "Đã có lỗi xảy ra, vui lòng thử lại"
    });
});

const getAllBlogCategory = asyncHandler(async (req, res) => {
    const listBlogCategory = await BlogCategory.find().select('title _id');

    return res.status(200).json({
        success: listBlogCategory ? true : false,
        listBlogCategory: listBlogCategory ? listBlogCategory : "Đã có lỗi xảy ra, vui lòng thử lại"
    });
});

const getBlogCategory = asyncHandler(async (req, res) => {
    const { bcid } = req.params;

    const blogCategory = await BlogCategory.findById(bcid);

    return res.status(200).json({
        success: blogCategory ? true : false,
        blogCategory: blogCategory ? blogCategory : "Đã có lỗi xảy ra, vui lòng thử lại"
    });
});

const updateBlogCategory = asyncHandler(async (req, res) => {
    const { bcid } = req.params;
    const updateBlogCategory = await BlogCategory.findByIdAndUpdate(bcid, req.body, { new: true });

    return res.status(200).json({
        success: updateBlogCategory ? true : false,
        updateBlogCategory: updateBlogCategory ? updateBlogCategory : "Đã có lỗi xảy ra, vui lòng thử lại"
    });
});

const deleteBlogCategory = asyncHandler(async (req, res) => {
    const { bcid } = req.params;
    const delBlogCategory = await BlogCategory.findByIdAndDelete(bcid);

    return res.status(200).json({
        success: delBlogCategory ? true : false,
        mes: delBlogCategory ? `Đã xoá danh mục bài viết ${delBlogCategory.title}` : "Đã có lỗi xảy ra, vui lòng thử lại"
    });
});

module.exports = {
    createBlogCategory,
    getAllBlogCategory,
    getBlogCategory,
    updateBlogCategory,
    deleteBlogCategory
};
