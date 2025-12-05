// controller - dal + bll - כל הלוגיקה כולל גישה לנתונים

import Article from "../models/article.js"

export const getAll = (req, res) => {
    // שליפה של כל המאמרים / כתבות
    // find - ToList
    Article.find()
        // populate - join SQL - inclue C#
        // שליפת אובייקטים של קשרי גומלין - לפי הקוד של המפתח הזר
        // .populate('category')
        // שליפת שדות מסוימים מתוך האובייקט המקושר
        .populate({ path: 'category', select: '-__v -_id' })
        // הפרמטר שמתקבל - הנתונים שחזרו מהשליפה
        .then(data => {
            res.status(200).send(data)
        })
        // הפרמטר שמתקבל - אובייקט שגיאה
        .catch(err => {
            res.status(500).send({ error: err.message })
        })
}

export const getById = (req, res) => {
    // findById - Find - עובדת לפי המפתח הראשי
    Article.findById(req.params.id)
        .then(article => {
            if (!article) {
                return res.status(404).send({ error: 'article not found!' })
            }
            res.status(200).send(article)
        })
        .catch(err => {
            res.status(500).send({ error: err.message })
        })
}

export const create = (req, res) => {

    // const newArticle = new Article(req.body)

    const { title, description, content, category } = req.body

    // יצירת אובייקט חדש
    const newArticle = new Article({
        title,
        description,
        content,
        category
    })

    // פונקציית השמירה במסד מתבצעת על האובייקט בשונה מפונצקיות אחרות שמתבצעות על המודל
    // השמירה תתבצע במודל - לפי הקצאת האובייקט
    newArticle.save()
        .then(article => {
            res.status(200).send(article)
        })
        .catch(err => {
            res.status(500).send({ error: err.message })
        })
}

export const remove = (req, res) => {

    // Article.findByIdAndDelete(req.params.id)
    //     .then(article => {
    //         res.status(200).send({ message: `delete article ${article._id} succeed!` })
    //     })
    //     .catch(err => {
    //         res.status(500).send({ error: err.message })
    //     })

    // חיפוש אובייקט לפי קוד
    // בדיקה - אם כן - למחוק
    // findByIdAndDelete - חיפוש ומחיקה מיד בלי אפשרות לתפוס את האובייקט
    Article.findById(req.params.id)
        .then(article => {
            if (!article) {
                return res.status(404).send({ error: 'article not found!' })
            }
            // בדיקה
            if (article.content.length < 20) {
                // deleteOne - מופעלת על אובייקט מסויים
                article.deleteOne()
                    .then(a => {
                        res.status(200).send({ message: `delete article ${a._id} succeed!` })
                    })
            }
        })

    // deleteMany - מופעלת על מערך

}

export const update = (req, res) => {

    const { id } = req.params

    // 1. קוד של האובייקט אותו נרצה לעדכן
    // 2. ערכים לעדכון
    // 3. אובייקט אפשרויות
    Article.findByIdAndUpdate(id, req.body, { new: true })
        // בברירת מחדל - חוזר האובייקט לפני השינוי
        // אם נרצה להחזיר את האובייקט החדש
        // באובייקט האפשרויות new: true נוסיף את ההגדרה
        .then(article => {
            res.status(200).send({ message: `update article ${article._id} succeed!`, article })
        })
        .catch(error => {
            res.status(500).send({ error: error.message })
        })

    // updateOne גם כאן ניתן להשתמש בפונקציה 
}