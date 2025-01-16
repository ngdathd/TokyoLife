const Blog = require('../models/blog');
const asyncHandler = require('express-async-handler');

const createNewBlog = asyncHandler(async (req, res) => {
    const { title, description, category } = req.body;

    if (!title || !description || !category) {
        throw new Error("Vui lòng nhập đầy đủ thông tin")
    }

    const newBlog = await Blog.create(req.body);

    return res.status(200).json({
        success: newBlog ? true : false,
        newBlog: newBlog ? newBlog : "Đã có lỗi xảy ra. vui lòng thử lại"
    })
});

const getAllBlog = asyncHandler(async (req, res) => {
    const listBlog = await Blog.find()
        .populate('likes', 'firstname lastname')
        .populate('disLikes', 'firstname lastname')

    return res.status(200).json({
        success: listBlog ? true : false,
        listBlog: listBlog ? listBlog : "Đã có lỗi xảy ra, vui lòng thử lại"
    })
});

const getBlog = asyncHandler(async (req, res) => {
    const { bid } = req.params;

    const blog = await Blog.findByIdAndUpdate(bid, { $inc: { numberView: 1 } }, { new: true })
        .populate('likes', 'firstname lastname')
        .populate('disLikes', 'firstname lastname')

    return res.status(200).json({
        success: blog ? true : false,
        blog: blog ? blog : "Đã có lỗi xảy ra, vui lòng thử lại"
    });
});


const updateBlog = asyncHandler(async (req, res) => {
    const { bid } = req.params;

    if (Object.keys(req.body).length === 0) {
        throw new Error("Vui lòng nhập đầy đủ thông tin");
    }

    const response = await Blog.findByIdAndUpdate(bid, req.body, { new: true })

    return res.status(200).json({
        success: response ? true : false,
        updateBlog: response ? response : "Đã có lỗi xảy ra, vui lòng thử lại"
    })
});

const deleteBlog = asyncHandler(async (req, res) => {
    const { bid } = req.params;
    const delBlog = await Blog.findByIdAndDelete(bid);

    return res.status(200).json({
        success: delBlog ? true : false,
        mes: delBlog ? `Đã xoá bài viết ${delBlog.title}` : "Đã có lỗi xảy ra, vui lòng thử lại"
    })
});

const likeBlog = asyncHandler(async (req, res) => {
    const { _id } = req.user;
    const { bid } = req.params;

    if (!bid) {
        throw new Error("Vui lòng nhập đầy đủ thông tin");
    }

    const blog = await Blog.findById(bid);

    const alreadyDislike = blog?.disLikes?.find(el => el.toString() === _id);
    if (!alreadyDislike) {
        const response = await Blog.findByIdAndUpdate(bid, { $pull: { disLikes: _id }, isDisliked: false }, { new: true });
        return res.status(200).json({
            success: response ? true : false,
            response
        })
    }

    const isLiked = blog?.isLiked;

    if (isLiked) {
        const response = await Blog.findByIdAndUpdate(bid, { $pull: { likes: _id }, isDisliked: false }, { new: true });
        return res.status(200).json({
            success: response ? true : false,
            response
        })
    } else {
        const response = await Blog.findByIdAndUpdate(bid, { $push: { likes: _id }, isLiked: true }, { new: true });
        return res.status(200).json({
            success: response ? true : false,
            response
        })
    }

});

const dislikeBlog = asyncHandler(async (req, res) => {
    const { _id } = req.user;
    const { bid } = req.params;

    if (!bid) {
        throw new Error("Vui lòng nhập đầy đủ thông tin");
    }

    const blog = await Blog.findById(bid);

    const alreadyLiked = blog?.likes?.find(el => el.toString() === _id);
    if (!alreadyLiked) {
        const response = await Blog.findByIdAndUpdate(bid, { $pull: { likes: _id }, isLiked: false }, { new: true });
        return res.status(200).json({
            success: response ? true : false,
            response
        })
    }

    const isDisliked = blog?.isDisliked;

    if (isDisliked) {
        const response = await Blog.findByIdAndUpdate(bid, { $pull: { disLikes: _id }, isDisliked: false }, { new: true });
        return res.status(200).json({
            success: response ? true : false,
            response
        })
    } else {
        const response = await Blog.findByIdAndUpdate(bid, { $push: { disLikes: _id }, isDisliked: true }, { new: true });
        return res.status(200).json({
            success: response ? true : false,
            response
        })
    }

});

const uploadImageBlog = asyncHandler(async (req, res) => {
    const { bid } = req.params;
    if (!req.file) {
        throw new Error("Không có ảnh được tải lên");
    }
    const response = await Blog.findByIdAndUpdate(bid, { image: req.file.path }, { new: true })
    return res.status(200).json({
        success: response ? true : false,
        upload: response ? response : "Đã có lỗi xảy ra, vui lòng thử lại"
    })
})

module.exports = {
    createNewBlog,
    updateBlog,
    getAllBlog,
    getBlog,
    updateBlog,
    deleteBlog,
    likeBlog,
    dislikeBlog,
    uploadImageBlog
}