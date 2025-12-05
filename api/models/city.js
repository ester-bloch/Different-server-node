import mongoose from "mongoose";
import Apartment from "./apartment.js";
const citySchema=mongoose.Schema({
    name:{
        type:String,
        require:true,
        maxLength:50
    },
    apartments:[{ 
         type:mongoose.Types.ObjectId,
         ref: 'Apartment'
        }],
   
})
export default mongoose.model('City',citySchema);