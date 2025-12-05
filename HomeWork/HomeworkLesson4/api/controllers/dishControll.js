import Dish from "../models/Dish.js";
import Category from "../models/category.js";

export const getAll = (req, res) => {
    Dish.find()
        .populate({ path: 'category', select: { description: 1, _id: 0 } })
        .then(data => {
            res.status(200).send(data)
        })
        .catch(err => {
            res.status(500).send({ error: err.message })
        })
}
/**
צרי פונקציות שליפה:
כל המנות לפי טעם מסוים (פרמטר)
כל המנות שיש להן פחות קלוריות מ... (פרמטר)
 .where({
            $and: [
                { price: { $lte: 15 } },
                { amount: { $lt: 20 } }
            ]

 .where({
            $or: [
                { price: { $lte: 15 } },
                { amount: { $lt: 20 } }
            ]
        })
        .where({ price: { $lt: 20 } })
 */
export const byTaste = (req, res,) => {
    Dish.find()
        .where({ taste: { $eq: req.params.taste } })
        .then(data => {
            res.status(200).send(data)
        })
        .catch(err => {
            res.status(500).send({ error: err, "req.params.taste": req.params.taste })
        })
}
export const lessCal = (req, res,) => {
    Dish.find()
        .where({ calories: { $lt: req.params.cal } })
        .then(data => {
            res.status(200).send(data)
        })
        .catch(err => {
            res.status(500).send({ error: err, "req.params.taste": req.params.taste })
        })
}
export const getById = (req, res) => {
    Dish.findById(req.params.id)
        .populate({ path: 'category', select: '-_id description' })
        .then(data => {
            if (!data) return res.status(404).send({ error: 'Dish not found' })
            res.status(200).send(data)
        })
        .catch(err => {
            res.status(500).send({ error: err.message })
        })
}


export const create = (req, res) => {

    const { name, calories, taste, Ingredients, description, category } = req.body
    const newDish = new Dish({
        name, calories, taste, Ingredients, description, category
    })
    newDish.save().
        then(async data => {
            await Category.findByIdAndUpdate(category, { $push: { dishes: data._id } })
            res.status(200).send(data)
        })
        .catch(err => {
            res.status(500).send({ error: err.message })
        })
}

export const remove = (req, res) => {
    Dish.findByIdAndDelete(req.params.id)
        .then(async data => {
            await Category.findByIdAndUpdate(data.category, {$pull: { dishes: data._id } })
            res.status(200).send({ message: `delete Dish ${Dish._id} succeeded!` })
        })
        .catch(err => {
            res.status(500).send({ error: err.message })
        })
}

export const update = (req, res) => {
    const { id } = req.params
    Dish.findByIdAndUpdate(id, req.body,).
        then(async data => {
            const { category } = req.body
            if (category) {
                Category.findByIdAndUpdate(category, { $push: { data: data._id } })
                await Category.findByIdAndUpdate(data.category, { $pull: { data: data._id } })
                await res.status(200).send({ message: `update dish ${data._id} succeeded` })
            }
        })
        .catch(err => {
            res.status(500).send({ error: err.message })
        })
}