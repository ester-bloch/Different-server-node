import mongoose from "mongoose";
const dishSchema=mongoose.Schema({
    name:{
        type:String,
        require:true,
        maxLength:50
    },
    description:String,
    Ingredients:[{
        type:String,
    }],
    taste:String,
    calories:Number,
    category: {
            type: mongoose.Types.ObjectId,
            ref: 'Category'
        }
})
export default mongoose.model('Dish',dishSchema)