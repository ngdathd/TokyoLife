const User = require('../models/user');
const Bill = require('../models/bill');
const asyncHandler = require('express-async-handler');
const { generateAccessToken, generateRefreshToken } = require('../middlewares/jwt');
const jwt = require('jsonwebtoken');
const sendMail = require('../utils/sendMail');
const crypto = require('crypto');

//register
const register = asyncHandler(async (req, res) => {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
        return res.status(400).json({
            success: false,
            mes: "Vui lòng nhập đầy đủ thông tin"
        })
    }

    const user = await User.findOne({ email });

    if (user) {
        throw new Error('Email đã được đăng ký với tài khoản khác');
    } else {
        const newUser = await User.create(req.body);

        return res.status(200).json({
            success: newUser ? true : false,
            mes: newUser ? 'Đăng ký tài khoản thành công' : 'Đã có lỗi xảy ra, vui lòng thử lại sau'
        })
    }
});

//login
const login = asyncHandler(async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({
            success: false,
            mes: "Vui lòng nhập đầy đủ thông tin"
        });
    }

    const response = await User.findOne({ email });

    if (response && await response.isCorrectPassword(password)) {

        const { password, role, refreshToken, ...userData } = response.toObject();
        //create access token
        const accessToken = generateAccessToken(response._id, response.name, role);
        //create refresh token
        const newRefreshToken = generateRefreshToken(response._id);
        //update refresh token in db
        await User.findByIdAndUpdate(response._id, { refreshToken: newRefreshToken }, { new: true });

        // save refresh token in cookie
        res.cookie('refreshToken', newRefreshToken, { httpOnly: true, maxAge: 7 * 24 * 60 * 60 * 1000 });
        // save access token in cookie
        res.cookie('accessToken', accessToken, { httpOnly: true, maxAge: 30 * 60 * 1000 }); // Example expiration: 30 minutes

        return res.status(200).json({
            success: true,
            accessToken,
            userData
        });
    } else {
        throw new Error("Thông tin đăng nhập không chính xác");
    }
});


//get a user
const getCurrent = asyncHandler(async (req, res) => {
    const { _id } = req.user;
    const user = await User.findById(_id)
        .select('-refreshToken -password -role')

    return res.status(200).json({
        success: user ? true : false,
        rs: user ? user : "Không tìm thấy người dùng này"
    })
});

//refresh access token
const refreshAccessToken = asyncHandler(async (req, res) => {
    const cookie = req.cookies;

    if (!cookie || !cookie.refreshToken) {
        throw new Error("Refresh token không được cung cấp");
    }

    try {
        const rs = await jwt.verify(cookie.refreshToken, process.env.SECRET_KEY);
        const response = await User.findOne({ _id: rs._id, refreshToken: cookie.refreshToken });

        return res.status(200).json({
            success: response ? true : false,
            newAccessToken: response ? generateAccessToken(response._id, response.role) : "Refresh token không hợp lệ"
        });
    } catch (error) {
        return res.status(401).json({
            success: false,
            message: "Lỗi xác thực refresh token"
        });
    }
});

//đăng xuất
const logout = asyncHandler(async (req, res) => {
    const cookie = req.cookies;

    if (!cookie || !cookie.refreshToken) {
        throw new Error("Không có refresh token trong cookie");
    }

    await User.findOneAndUpdate({ refreshToken: cookie.refreshToken }, { $unset: { refreshToken: "" } });

    res.clearCookie('refreshToken', {
        httpOnly: true,
        secure: true
    });

    return res.status(200).json({
        success: true,
        mes: 'Đăng xuất thành công'
    });
});

//gửi email quên mk
const forgotPassword = asyncHandler(async (req, res) => {
    const { email } = req.body;

    if (!email) {
        throw new Error("Vui lòng nhập vào địa chỉ email");
    }

    const user = await User.findOne({ email });
    if (!user) {
        throw new Error("Không tìm thấy người dùng với email này");
    }

    const resetToken = user.createPasswordChangeToken();
    await user.save();

    const html = `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Đặt Lại Mật Khẩu</title>
    <style>
        /* Định dạng CSS cho email */
        body {
            font-family: Arial, sans-serif;
            background-color: #f9f9f9;
            padding: 20px;
        }
        .container {
            padding: 20px;
            background-color: #fff;
            border-radius: 5px;
            box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
        }
        h2 {
            color: #333;
            margin-bottom: 20px;
        }
        p {
            color: #666;
            margin-bottom: 20px;
        }
        .btn {
            display: inline-block;
            padding: 10px 20px;
            background-color: #007bff;
            color: #fff;
            text-decoration: none;
            border-radius: 5px;
        }
        .btn:hover {
            background-color: #0056b3;
        }
    </style>
</head>
<body>
    <div class="container">
        <h2>Đặt Lại Mật Khẩu</h2>
        <p>Chúng tôi vừa nhận được yêu cầu lấy lại mật khẩu từ bạn</p>
        <p>Vui lòng nhấn vào đường dẫn bên dưới để thay đổi mật khẩu của bạn. Đường dẫn này sẽ hết hạn sau 15 phút.</p>
        <a href="${process.env.URL}/password/reset/${resetToken}" style="display: inline-block; padding: 10px 20px; background-color: #007bff; color: #fff; text-decoration: none; border-radius: 5px;">Nhấn Vào Đây</a>
    </div>
</body>
</html>
`;

    const subject = "Đặt Lại Mật Khẩu";

    const data = {
        email,
        subject,
        html
    }

    const rs = await sendMail(data);

    return res.status(200).json({
        success: true,
        rs
    })
});

//cập nhật mật khẩu
const resetPassword = asyncHandler(async (req, res) => {
    const { token, password } = req.body;

    if (!token || !password) {
        res.status(401).json({
            success: false,
            mes: "Vui lòng cung cấp đầy đủ thông tin "
        })
    }

    const passwordResetToken = crypto.createHash('sha256').update(token).digest('hex');
    const user = await User.findOne({ passwordResetToken, passwordResetExpires: { $gt: Date.now() } });

    if (!user) {
        return res.status(400).json({
            success: false,
            mes: 'Reset token không hợp lệ'
        });
    }

    user.password = password;
    user.passwordResetToken = undefined;
    user.passwordChangeAt = Date.now();
    user.passwordResetExpires = undefined;
    await user.save();

    return res.status(200).json({
        success: true,
        mes: 'Cập nhật mật khẩu thành công'
    });
});

//lấy tất cả ngườii dùng
const getUsers = asyncHandler(async (req, res) => {
    const response = await User.find().select('-refreshToken -password ');
    return res.status(200).json({
        success: response ? true : false,
        users: response
    })
})

//xoá người dùng
const deleteUser = asyncHandler(async (req, res) => {
    const { _id } = req.query;

    if (!_id) {
        throw new Error("Đã có lỗi xảy ra, vui lòng thử lại")
    }

    //user đã có đơn hàng thì không thể xoá
    const user = await User.findById(_id);
    if (!user) {
        return res.status(404).json({
            success: false,
            mes: "Người dùng không được tìm thấy"
        });
    }

    const bills = await Bill.find({ user: _id });
    if (bills.length > 0) {
        return res.status(400).json({
            success: false,
            mes: "Không thể xoá người dùng này"
        });
    }

    //xoá user
    await User.findByIdAndDelete(_id);

    return res.status(200).json({
        success: true,
        mes: `Tài khoản ${user.email} đã được xoá`
    });
})

const updateUser = asyncHandler(async (req, res) => {
    const { _id } = req.user;

    if (!_id) {
        throw new Error("Đã có lỗi xảy ra, vui lòng thử lại");
    }

    const user = await User.findByIdAndUpdate(_id, req.body, { new: true }).select('-password -role -refreshToken');
    if (!user) {
        return res.status(404).json({
            success: false,
            mes: "Người dùng không được tìm thấy"
        });
    }

    return res.status(200).json({
        success: true,
        mes: "Cập nhật thành công",
        user: user
    });
});

const updateUserByAdmin = asyncHandler(async (req, res) => {
    const { uid } = req.params;

    if (!uid) {
        throw new Error("Đã có lỗi xảy ra, vui lòng thử lại");
    }

    const user = await User.findByIdAndUpdate(uid, req.body, { new: true }).select('-password -refreshToken');

    if (!user) {
        return res.status(404).json({
            success: false,
            mes: "Người dùng không được tìm thấy"
        });
    }

    return res.status(200).json({
        success: true,
        mes: "Cập nhật thành công",
        user: user
    });
});

//thêm vào wishlist
const addToWishlist = asyncHandler(async (req, res) => {
    const { _id } = req.user;
    const { productId } = req.body;

    if (!_id || !productId) {
        throw new Error("Đã có lỗi xảy ra, vui lòng thử lại");
    }

    const user = await User.findById(_id);
    if (!user) {
        return res.status(404).json({
            success: false,
            mes: "Người dùng không được tìm thấy"
        });
    }

    const wishlist = user.wishlist;

    if (wishlist.includes(productId)) {
        return res.status(400).json({
            success: false,
            mes: "Sản phẩm đã có trong danh sách yêu thích"
        });
    }

    wishlist.push(productId);
    await User.findByIdAndUpdate(_id, { wishlist: wishlist });

    return res.status(200).json({
        success: true,
        mes: "Thêm vào danh sách yêu thích thành công"
    });
});

//xoá khỏi wishlist
const deleteFromWishlist = asyncHandler(async (req, res) => {
    const { _id } = req.user;
    const { productId } = req.body;

    if (!_id || !productId) {
        throw new Error("Đã có lỗi xảy ra, vui lòng thử lại");
    }

    const user = await User.findById(_id);
    if (!user) {
        return res.status(404).json({
            success: false,
            mes: "Người dùng không được tìm thấy"
        });
    }

    const wishlist = user.wishlist;

    if (!wishlist.includes(productId)) {
        return res.status(400).json({
            success: false,
            mes: "Sản phẩm không có trong danh sách yêu thích"
        });
    }

    const newWishlist = wishlist.filter(item => item !== productId);
    await User.findByIdAndUpdate(_id, { wishlist: newWishlist });

    return res.status(200).json({
        success: true,
        mes: "Xoá khỏi danh sách yêu thích thành công",
        newWishlist
    });
});

//thêm user bằng admin
const addUserByAdmin = asyncHandler(async (req, res) => {
    const newUser = await User.create(req.body);

    return res.status(200).json({
        success: newUser ? true : false,
        mes: newUser ? 'Thêm tài khoản thành công' : 'Đã có lỗi xảy ra, vui lòng thử lại sau'
    })
});

//lấy user theo id
const getUserById = asyncHandler(async (req, res) => {
    const { uid } = req.params;

    if (!uid) {
        throw new Error("Đã có lỗi xảy ra, vui lòng thử lại");
    }

    const user = await User.findById(uid).select('-password -refreshToken');

    if (!user) {
        return res.status(404).json({
            success: false,
            mes: "Người dùng không được tìm thấy"
        });
    }

    return res.status(200).json({
        success: true,
        user: user
    });
});

//upload images
const uploadImagesUser = asyncHandler(async (req, res) => {

})

module.exports = {
    register,
    login,
    getCurrent,
    refreshAccessToken,
    logout,
    forgotPassword,
    resetPassword,
    getUsers,
    deleteUser,
    updateUser,
    updateUserByAdmin,
    addToWishlist,
    addUserByAdmin,
    getUserById,
    deleteFromWishlist
}