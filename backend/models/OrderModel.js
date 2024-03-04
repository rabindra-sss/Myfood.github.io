import mongoose from 'mongoose'

const orderSchema = new mongoose.Schema({
    itemId: {
        type: String,
        required: [true, "item id is required"]
    },
    img: {
        type: String,
        required: [true, "item img is required"]
    },
    name: {
        type: String,
        required: [true, "item name is required"]
    },
    size: {
        type: String,
        required: [true, "item size is required"]
    },
    defaultPrice: {
        type: String,
        required: [true, "default price is required"]
    },
    qty: {
        type: String,
        required: [true, "default price is required"]
    },

    finalPrice: {
        type: String,
        required: [true, "final price is required"]
    },

    location: {
        type: String,
        default: "Mumbai"
    },
    orderedby: {
        type: mongoose.Types.ObjectId,
        ref: "User",
        required: [true, "try again later"]
    }

}, {timestamps: true})

export default mongoose.model('order', orderSchema);