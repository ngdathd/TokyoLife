const Brand = require('../models/brand');
const asyncHandler = require('express-async-handler');

const createBrand = asyncHandler(async (req, res) => {
    const newBrand = await Brand.create(req.body);
    return res.status(200).json({
        success: newBrand ? true : false,
        newBrand: newBrand ? newBrand : "Đã có lỗi xảy ra, vui lòng thử lại"
    })
})

const getAllBrand = asyncHandler(async (req, res) => {
    const listBrand = await Brand.find().select('title _id');

    return res.status(200).json({
        success: listBrand ? true : false,
        listBrand: listBrand ? listBrand : "Đã có lỗi xảy ra, vui lòng thử lại"
    })
})

const getBrand = asyncHandler(async (req, res) => {
    const { brid } = req.params;

    const brand = await Brand.findById(brid);

    return res.status(200).json({
        success: brand ? true : false,
        brand: brand ? brand : "Đã có lỗi xảy ra, vui lòng thử lại"
    })
});

const updateBrand = asyncHandler(async (req, res) => {
    const { brid } = req.params;
    const updateBrand = await Brand.findByIdAndUpdate(brid, req.body, { new: true });

    return res.status(200).json({
        success: updateBrand ? true : false,
        updateBrand: updateBrand ? updateBrand : "Đã có lỗi xảy ra, vui lòng thử lại"
    })
})

const deleteBrand = asyncHandler(async (req, res) => {
    const { brid } = req.params;
    const delBrand = await Brand.findByIdAndDelete(brid);

    return res.status(200).json({
        success: delBrand ? true : false,
        mes: delBrand ? `Đã xoá danh mục ${delBrand.title}` : "Đã có lỗi xảy ra, vui lòng thử lại"
    })
})

module.exports = {
    createBrand,
    getAllBrand,
    getBrand,
    updateBrand,
    deleteBrand
}
