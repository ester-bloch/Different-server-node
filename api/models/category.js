import mongoose from "mongoose";
const categorySchema=mongoose.Schema({
    name:{
        type:String,
        required:true,
        maxLength:50
    },
    apartments:[{ 
         type:mongoose.Types.ObjectId,
         ref: 'Apartment'
        }],
   
})
export default mongoose.model('Category',categorySchema);