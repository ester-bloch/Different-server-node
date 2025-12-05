// controller - dal + bll - כל הלוגיקה כולל גישה לנתונים

import Article from "../models/article.js"

export const getAll = (req, res) => {
    // שליפה של כל המאמרים / כתבות
    // find - ToList
    Article.find()
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

    const { title, description, content } = req.body

    // יצירת אובייקט חדש
    const newArticle = new Article({
        title,
        description,
        content
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
    Article.findByIdAndDelete(req.params.id)
        .then(article => {
            res.status(200).send({ message: `delete article ${article._id} succeed!` })
        })
        .catch(err => {
            res.status(500).send({ error: err.message })
        })
}