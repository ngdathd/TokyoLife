const Coupon = require('../models/coupon');
const asyncHandler = require('express-async-handler');

const createNewCoupon = asyncHandler(async (req, res) => {
    const { name, discount, expiry } = req.body;

    if (!name || !discount || !expiry) {
        throw new Error('Vui lòng nhập đầy đủ thông tin')
    }

    const response = await Coupon.create({
        ...req.body,
        expiry: Date.now() + +expiry * 24 * 60 * 60 * 1000
    });
    return res.status(200).json({
        success: response ? true : false,
        newCoupon: response ? response : "Đã có lỗi xảy ra, vui lòng thử lại"
    })
});

const getAllCoupon = asyncHandler(async (req, res) => {
    const response = await Coupon.find().select(' -updatedAt');

    return res.status(200).json({
        success: response ? true : false,
        listCoupon: response ? response : "Đã có lỗi xảy ra, vui lòng thử lại"
    })
});

const getCoupon = asyncHandler(async (req, res) => {
    const { cpid } = req.params;

    const response = await Coupon.findById(cpid);
    return res.status(200).json({
        success: response ? true : false,
        coupon: response ? response : "Đã có lỗi xảy ra, vui lòng thử lại"
    })
})

const updateCoupon = asyncHandler(async (req, res) => {
    const { cpid } = req.params;

    if (Object.keys(req.body).length === 0) {
        throw new Error("Vui lòng nhập đầy đủ thông tin");
    }

    if (req.body.expiry) {
        const { expiry } = req.body;
        req.body.expiry = Date.now() + +expiry * 24 * 60 * 60 * 1000
    }

    const response = await Coupon.findByIdAndUpdate(cpid, req.body, { new: true })
    return res.status(200).json({
        success: response ? true : false,
        updateCoupon: response ? response : "Đã có lỗi xảy ra, vui lòng thử lại"
    })
});

const deleteCoupon = asyncHandler(async (req, res) => {
    const { cpid } = req.params;

    const response = await Coupon.findByIdAndDelete(cpid);

    return res.status(200).json({
        success: response ? true : false,
        deleteCoupon: response ? `Đã xoá mã ${response.name}` : "Đã có lỗi xảy ra, vui lòng thử lại"
    })
})

module.exports = {
    createNewCoupon,
    getAllCoupon,
    getCoupon,
    updateCoupon,
    deleteCoupon
}