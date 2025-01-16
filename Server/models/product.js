const mongoose = require('mongoose'); // Erase if already required

// Declare the Schema of the Mongo model
var productSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true
    },
    slug: {
        type: String,
        required: true,
        unique: true,
        lowercase: true
    },
    description: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
    sale: {
        type: Number,
        default: 0
    },
    category: {
        type: mongoose.Types.ObjectId,
        ref: "Category"
    },
    numberView: {
        type: Number,
        default: 0
    },
    images: {
        type: Array,
    },
    variants: [
        {
            size: String,
            color: String,
            quantity: Number
        }
    ],
    rating: [
        {
            star: { type: Number },
            postedBy: { type: mongoose.Types.ObjectId, ref: 'User' },
            comment: { type: String }
        }
    ],
    isFlashSale: {
        type: Boolean,
        default: false
    },
    totalRating: {
        type: Number,
        default: 0
    },
},
    { timestamps: true }
);

//Export the model
module.exports = mongoose.model('Product', productSchema);