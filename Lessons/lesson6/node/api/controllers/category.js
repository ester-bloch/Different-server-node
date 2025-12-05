// controller - dal + bll - כל הלוגיקה כולל גישה לנתונים

import Category from "../models/category.js"

export const getAll = (req, res) => {
    Category.find()
        .then(data => {
            res.status(200).send(data)
        })
        .catch(err => {
            res.status(500).send({ error: err.message })
        })
}

export const getById = (req, res) => {
    Category.findById(req.params.id)
        .then(c => {
            if (!c) {
                return res.status(404).send({ error: 'article not found!' })
            }
            res.status(200).send(c)
        })
        .catch(err => {
            res.status(500).send({ error: err.message })
        })
}

export const create = (req, res) => {

    const { title, description } = req.body

    // יצירת אובייקט חדש
    const c = new Category({
        title,
        description,
        // ניתן להגדיר את המערך
        // אולם אין צורך - כיון שבמודל כבר הגדרנו את המאפיין שהוא מערך
        // articles:[]
    })
    c.save()
        .then(c => {
            res.status(200).send(c)
        })
        .catch(err => {
            res.status(500).send({ error: err.message })
        })
}

export const remove = (req, res) => {
    Category.findByIdAndDelete(req.params.id)
        .then(c => {
            res.status(200).send({ message: `delete category ${c._id} succeed!` })
        })
        .catch(err => {
            res.status(500).send({ error: err.message })
        })
}

export const update = (req, res) => {

    const { id } = req.params

    Category.findByIdAndUpdate(id, req.body, { new: true })
        .then(c => {
            res.status(200).send({ message: `update category ${c._id} succeed!`, c })
        })
        .catch(error => {
            res.status(500).send({ error: error.message })
        })
}