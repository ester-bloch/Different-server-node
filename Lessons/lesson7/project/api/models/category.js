import mongoose from "mongoose";

const categorySchema = mongoose.Schema({
    title: {
        type: String,
        require: true,
    },
    description: String,
    // הגרת מערך שיכיל את כל הקודים של המאמרים שמשוייכים לקטגוריה
    // מקובל במונגו אפילו שזה תופס מקום נוסף במסד הנתונים
    articles: [{
        type: mongoose.Types.ObjectId,
        ref: 'Article'
    }]
})

export default mongoose.model('Category', categorySchema)