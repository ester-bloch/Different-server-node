import mongoose from "mongoose";
const ApartmentSchema = mongoose.Schema({
    name: {
        type: String,
        required: false,
    },
    description: {
        type: String,
        required: true,
    },
    category: {
        type: mongoose.Types.ObjectId,
        ref: 'Category',
        required: true,
    },
    city: {
        type: mongoose.Types.ObjectId,
        ref: 'City'
        , required: true,
    },
    advertiser: {
        type: mongoose.Types.ObjectId,
        ref: 'Advertiser',
        required: true,
    },
    address: {
        type: String,
        required: false,
    },
    numbeds: {
        type: Number,
        required: false,
    },
    more: [{
        type: String,
        required: false,
    }],
    price: {
        type: Number,
        required: true,
    },
    picture:{
        type:String,
        required:false,
    }


})
export default mongoose.model('Apartment', ApartmentSchema)