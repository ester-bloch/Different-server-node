import mongoose from "mongoose";
const categorySchema=mongoose.Schema({
    name:{
        type:String,
        require:true,
        maxLength:50
    },
    description:String,
    dishes:[{ 
         type:mongoose.Types.ObjectId,
         ref: 'Dish'
        }],
   
})
export default mongoose.model('Category',categorySchema)