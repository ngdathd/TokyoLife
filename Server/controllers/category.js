const Category = require('../models/category');
const Product = require('../models/product');

const asyncHandler = require('express-async-handler');

const createCategory = asyncHandler(async (req, res) => {
    const categoryExist = await Category.findOne({ title: req.body.title });
    if (categoryExist) {
        return res.status(400).json({
            success: false,
            mes: "Danh mục sản phẩm đã tồn tại"
        });
    }

    const newCategory = await Category.create({ ...req.body, productCount: 0 });

    return res.status(200).json({
        success: true,
        newCategory: newCategory
    });
});

const getAllCategory = asyncHandler(async (req, res) => {
    const listCategory = await Category.find().lean();

    for (let category of listCategory) {
        const productCount = await Product.countDocuments({ category: category._id });
        category.productCount = productCount;
    }

    return res.status(200).json({
        success: true,
        listCategory: listCategory
    });
});



const getCategory = asyncHandler(async (req, res) => {
    const { cid } = req.params;

    const category = await Category.findById(cid);

    return res.status(200).json({
        success: category ? true : false,
        category: category ? category : "Đã có lỗi xảy ra, vui lòng thử lại"
    })
});

const updateCategory = asyncHandler(async (req, res) => {
    const { cid } = req.params;
    const updateCategory = await Category.findByIdAndUpdate(cid, req.body, { new: true });

    return res.status(200).json({
        success: updateCategory ? true : false,
        updateCategory: updateCategory ? updateCategory : "Đã có lỗi xảy ra, vui lòng thử lại"
    })
})

const deleteCategory = asyncHandler(async (req, res) => {
    const { cid } = req.params;

    // Kiểm tra xem danh mục có sản phẩm nào không
    const category = await Category.findById(cid);
    if (!category) {
        return res.status(404).json({ success: false, mes: "Danh mục không tồn tại" });
    }

    const productsInCategory = await Product.find({ category: cid });
    if (productsInCategory.length > 0) {
        return res.status(400).json({ success: false, mes: "Không thể xóa danh mục này" });
    }

    // Xóa danh mục nếu không có sản phẩm liên kết
    const delCategory = await Category.findByIdAndDelete(cid);

    return res.status(200).json({
        success: delCategory ? true : false,
        mes: delCategory ? `Đã xoá danh mục ${delCategory.title}` : "Đã có lỗi xảy ra, vui lòng thử lại"
    });
});


module.exports = {
    createCategory,
    getAllCategory,
    getCategory,
    updateCategory,
    deleteCategory
}
