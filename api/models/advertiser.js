import mongoose from "mongoose";
const advertizerSchema = mongoose.Schema({
    email: {
        type: String,
        unique: true,
        required: true,
        maxLength: 50
    },
    password: {
        type: String,
        required: true,
    },
    phoneNumber: {
        type: String,
        required: true,
    },
    phoneNumber2: {
        type: String,
        required:false
    },
    apartments: [{
        type: mongoose.Types.ObjectId,
        ref: 'Apartment'
    }]
    ,name:{
        type: String,
        required: false,
    }


})
export default mongoose.model('Advertiser', advertizerSchema)