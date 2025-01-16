const mongoose = require('mongoose');

const billSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: false,
        unique: false
    },
    name: {
        type: String,
        required: true,
        trim: true,
        unique: false
    },
    email: {
        type: String,
        required: true,
        unique: false
    },
    mobile: {
        type: String,
        required: true,
        unique: false
    },
    items: [
        {
            product: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Product",
                required: true
            },
            variantId: {
                type: String,
                required: true
            },
            quantity: {
                type: Number,
                required: true,
                min: 1
            }
        }
    ],
    shippingAddress: {
        type: String,
        required: true
    },
    discount: {
        type: Number,
        default: 0
    },
    paymentMethod: {
        type: String,
        required: true
    },
    shippingMethod: {
        type: String,
        required: true
    },
    note: {
        type: String,
        default: ""
    },
    status: {
        type: String,
        default: "Chờ Xác Nhận"
    }
}, { timestamps: true });

module.exports = mongoose.model('Bill', billSchema);
