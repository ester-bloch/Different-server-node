// model - מקביל לתיקייה שמכילה את כל המחלקות שנוצרו מהחיבור למסד
// code first - מחלקות שמגדירות את האובייקטים באוספים (טבלאות) במסד

import mongoose from "mongoose";

// schema - הגדרה של כל אובייקט באוסף
// model - הגדרה של האוסף

const articleSchema = mongoose.Schema({
    // שדה שנוצר אוטומטית - מפתח ראשי
    // אין צורך להגדיר
    // אם נגדיר - נצטרך להוסיף שורות קוד במקום
    // _id: mongoose.Schema.Types.ObjectId
    // אילוצים
    // אם נרצה להגדיר אילוצים יותר מאשר טיפוס - בתוך אובייקט ג'סון
    title: {
        type: String,
        // not null
        require: true,
        maxLength: 50
    },
    description: String,
    content: {
        type: String,
        require: true
    },
    // מפתח זר - קשרי גומלין
    category: {
        // סוג - מפתח ראשי של מודל
        type: mongoose.Types.ObjectId,
        // ref - reference - לאיזה מודל אני מצביע
        // שם המודל כמו שייצאנו אותו
        ref: 'Category'
    }
})

// פרמטרים:
// שם המודל
// הסכמה שמגדירה את האובייקטים באוסף
export default mongoose.model('Article', articleSchema)