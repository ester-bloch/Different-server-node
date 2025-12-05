import mongoose from "mongoose";

const productSchema = mongoose.Schema({
    description: {
        type: String,
        require: true
    },
    amount: Number,
    price: {
        type: Number,
        require: true
    },
    brings: String
})

export default mongoose.model('Product', productSchema)