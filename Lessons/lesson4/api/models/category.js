import mongoose from "mongoose";

const categorySchema = mongoose.Schema({
    title: {
        type: String,
        require: true,
    },
    description: String
})

export default mongoose.model('Category', categorySchema)