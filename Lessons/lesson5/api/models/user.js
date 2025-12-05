import mongoose from "mongoose";

const userSchema = mongoose.Schema({
    username: {
        type: String,
        require: true,
    },
    email: {
        type: String,
        require: true,
        // regex - ביטוי רגולרי
        // בין שני סלשים
        // match: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/
    },
    password: {
        type: String,
        require: true
    }
})

export default mongoose.model('User', userSchema)