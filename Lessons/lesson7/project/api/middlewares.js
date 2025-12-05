import Category from "./models/category.js"
import jwt from 'jsonwebtoken'

export const categoryExists = (req, res, next) => {

    const { category } = req.body

    if (!category) {
        // אם מדובר בהוספה
        if (req.method == 'POST')
            return res.status(400).send({ error: 'category is required!' })
        // אם מדובר בעדכון
        else {
            return next()
        }
    }

    Category.find({ _id: category })
        .then(category => {
            if (!category) {
                return res.status(404).send({ error: 'category not found!' })
            }
            next()
        })
        .catch(err => {
            res.status(500).send({ error: err.message })
        })
}

// middleware - בדיקת הטוקן
// קיים - נשלח
// תקין
// תקף
// נפעיל את המידלוור על כל פונקציה שנרצה לחייב שהמשתמש מחובר
export const checkAuth = (req, res, next) => {
    // req.headers.authorization.split(' ')[1]
    if (!req.headers.authorization) {
        // authorization - הרשאה
        return res.status(401).send({ error: 'Authorization failed!' })
    }
    const arr = req.headers.authorization.split(' ')

    if (arr.length == 1) {
        return res.status(401).send({ error: 'Authorization failed!' })
    }

    // עד כאן בדיקה שהטוקן קיים

    const [x, token] = arr

    // jwt.verify - אימות
    // בדיקה שהטוקן תקין ותקף
    // callback בפונקציית ה 
    // 1. שגיאה
    // 2. אובייקט מפוענח - מכיל את הנתןנים ששמרנו על המשתמש
    jwt.verify(token, process.env.SECRET, (error, decoded) => {
        if (error || !decoded) {
            // Authentication - אימות
            console.log(error.message);

            // return res.status(401).send({ error: 'Authentication failed!' })
            return res.status(401).send({ error: error.message })
        }
        // יתכן שנרצה כאן לשמור נתונים באובייקט הבקשה
        next()
    })

}