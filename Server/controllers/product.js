const slugify = require('slugify');
const Product = require('../models/product');
const Bill = require('../models/bill');
const cloudinary = require('cloudinary');

const asyncHandler = require('express-async-handler')

const createProduct = asyncHandler(async (req, res) => {
    if (!req.body || Object.keys(req.body).length === 0) {
        throw new Error("Vui lòng nhập đầy đủ thông tin");
    }

    if (req.body.title) {
        req.body.slug = slugify(req.body.title);
    }

    const { variants, ...productData } = req.body;

    const productVariants = [];

    if (variants && Array.isArray(variants)) {
        for (const variant of variants) {
            if (variant.size && variant.color && variant.quantity) {
                productVariants.push({
                    size: variant.size,
                    color: variant.color,
                    quantity: variant.quantity
                });
            }
        }
    }

    productData.variants = productVariants;
    const newProduct = await Product.create(productData);

    return res.status(201).json({
        success: true,
        createdProduct: newProduct
    });
});



const getProduct = asyncHandler(async (req, res) => {
    const { pid } = req.params;
    const product = await Product.findByIdAndUpdate(pid, { $inc: { numberView: 1 } }, { new: true }).populate('category').populate('rating.postedBy');

    res.status(200).json({
        success: product ? true : false,
        productData: product ? product : "Không tìm thấy sản phẩm này"
    })
});


// const getAllProduct = asyncHandler(async (req, res) => {
//     const { page = 1, limit = 12, sort, ...queries } = req.query;

//     // Thực hiện tìm kiếm theo các trường nhất định (ví dụ: title, brand)
//     const searchQuery = {};
//     if (queries.title) {
//         searchQuery.title = { $regex: new RegExp(queries.title, 'i') };
//     }
//     if (queries.brand) {
//         searchQuery.brand = { $regex: new RegExp(queries.brand, 'i') };
//     }

//     // Sắp xếp dữ liệu nếu có yêu cầu sắp xếp từ người dùng
//     let sortCriteria = {};
//     if (sort) {
//         const sortFields = sort.split(',');
//         sortFields.forEach(field => {
//             if (field === 'name_asc') {
//                 sortCriteria['title'] = 1;
//             } else if (field === 'name_desc') {
//                 sortCriteria['title'] = -1;
//             } else if (field === 'price_asc') {
//                 sortCriteria['price'] = 1;
//             } else if (field === 'price_desc') {
//                 sortCriteria['price'] = -1;
//             }
//         });
//     } else {
//         // Mặc định sắp xếp theo thời gian tạo (createdAt) giảm dần
//         sortCriteria.createdAt = -1;
//     }

//     // Phân trang
//     const skip = (page - 1) * limit;

//     try {
//         const products = await Product.find(searchQuery)
//             .populate('category')
//             .sort(sortCriteria)
//             .skip(skip)
//             .limit(parseInt(limit));

//         const totalCount = await Product.countDocuments(searchQuery);

//         res.status(200).json({
//             success: true,
//             products,
//             totalCount
//         });
//     } catch (error) {
//         res.status(500).json({
//             success: false,
//             error: 'Không thể lấy được sản phẩm'
//         });
//     }
// });

//trả về tất cả sản phẩm
const getAllProduct = asyncHandler(async (req, res) => {
    if (req.query.title) {
        const products = await Product.find({ title: { $regex: req.query.title, $options: 'i' } }).populate('category').populate('rating.postedBy');
        return res.status(200).json({
            success: true,
            products
        });
    }

    const products = await Product.find().populate('category').populate('rating.postedBy');
    res.status(200).json({
        success: true,
        products
    });
});

const updateProduct = asyncHandler(async (req, res) => {
    const { pid } = req.params;

    if (req.body && req.body.title) {
        req.body.slug = slugify(req.body.title);
    }

    const updateProduct = await Product.findByIdAndUpdate(pid, req.body, { new: true });

    return res.status(200).json({
        success: updateProduct ? true : false,
        updateProduct: updateProduct ? updateProduct : "Đã có lỗi xảy ra, vui lòng thử lại"
    });
})

const deleteProduct = asyncHandler(async (req, res) => {
    const { pid } = req.params;
    // const deleteProduct = await Product.findByIdAndDelete(pid);

    const product = await Product.findById(pid);

    if (!product) {
        throw new Error("Không tìm thấy sản phẩm này");
    }

    // const bill = await Bill.find({ "products.product": pid });

    // if (bill.length > 0) {
    //     throw new Error("Sản phẩm này đã được mua, không thể xoá");
    // }

    const bill = await Bill.find({ "products.product": pid });

    if (bill.length > 0) {
        throw new Error("Sản phẩm này đã được mua, không thể xoá");
    }

    const deleteProduct = await Product.findByIdAndDelete(pid);

    if (deleteProduct.images.length > 0) {
        deleteProduct.images.forEach(img => {
            const public_id = img.split('/').pop().split('.')[0];
            cloudinary.uploader.destroy(public_id, (err, result) => {
                if (err) {
                    console.log(err);
                }
            });
        });
    }
    return res.status(200).json({
        success: deleteProduct ? true : false,
        deleteProduct: deleteProduct ? `Đã xoá ${deleteProduct.title}` : "Đã có lỗi xảy ra, vui lòng thử lại"
    });
})

const ratings = asyncHandler(async (req, res) => {
    const { _id } = req.user;
    const { star, comment, pid } = req.body;
    if (!star || !pid) {
        throw new Error("Vui lòng cung cấp đầy đủ thông tin");
    }

    const ratingProduct = await Product.findById(pid);

    const alreadyRating = ratingProduct?.rating?.some(el => el.postedBy.toString() === _id);

    if (alreadyRating) {
        await Product.findOneAndUpdate(
            { _id: pid, "rating.postedBy": _id },
            { $set: { "rating.$[elem].star": star, "rating.$[elem].comment": comment } },
            { arrayFilters: [{ "elem.postedBy": _id }], new: true }
        );
    } else {
        // Thêm mới star và comment 
        await Product.findByIdAndUpdate(pid, {
            $push: { rating: { star, comment, postedBy: _id } }
        });
    }

    const updatedRating = await Product.findById(pid);
    const ratingCount = updatedRating.rating.length;

    const sumRating = updatedRating.rating.reduce((sum, el) => sum + +el.star, 0)
    updatedRating.totalRating = Math.round(sumRating * 10 / ratingCount) / 10

    await updatedRating.save();

    const product = await Product.findById(pid).populate('rating.postedBy');

    return res.status(200).json({
        success: true,
        message: "Đánh giá sản phẩm thành công",
        product
    });
});

const uploadImageProduct = asyncHandler(async (req, res) => {
    const { pid } = req.params;
    if (!req.files) {
        throw new Error("Không có ảnh được tải lên");
    }
    const response = await Product.findByIdAndUpdate(pid, { $push: { images: { $each: req.files.map(el => el.path) } } })
    return res.status(200).json({
        success: response ? true : false,
        upload: response ? response : "Đã có lỗi xảy ra, vui lòng thử lại"
    })
})

module.exports = {
    createProduct,
    getProduct,
    getAllProduct,
    updateProduct,
    deleteProduct,
    ratings,
    uploadImageProduct
}