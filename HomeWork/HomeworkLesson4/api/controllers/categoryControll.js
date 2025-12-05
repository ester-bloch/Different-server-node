import Category from "../models/category.js";
//import Dish from "../models/dish.js";

export const getAll = (req, res) => {
    console.log("here!!!!")
    Category.find()
        .then(data => {
            res.status(200).send(data)
        })
        .catch(err => {
            res.status(500).send({ error: err.message })
        })
}
// .populate({ path: 'category', select: { description: 1, _id: 0 } })

export const getDishes = (req, res) => {
    Category.findById(req.params.id)
        .select('-_id dishes')
        .then( data => {
            let list = []
            res.status(200).send(data)
        })
        .catch(err => {
            res.status(500).send({ error: err.message })
        })
}
export const getById = (req, res) => {
    Category.findById(req.params.id)
        .then(data => {
            if (!data) return res.status(404).send({ error: 'dish not found' })
            res.status(200).send(data)
        })
        .catch(err => {
            res.status(500).send({ error: err.message })
        })
}
export const create = (req, res) => {
    const { name, description, dishes } = req.body
    const newDish = new Category({
        name, description, dishes
    })
    newDish.save().
        then(data => {
            res.status(200).send(data)
        })
        .catch(err => {
            res.status(500).send({ error: err.message })
        })
}
export const remove = (req, res) => {
    Category.findByIdAndDelete(req.params.id)
        .then(data => {
            res.status(200).send({ message: `delete Category ${data._id} succeeded!` })
        })
        .catch(err => {
            res.status(500).send({ error: err.message })
        })
}

export const update = (req, res) => {
    const { id } = req.params
    Category.findByIdAndUpdate(id, req.body, { new: true })
        .then(data => {
            res.status(200).send({ message: `update Category ${data._id} succeeded!` })
        })
        .catch(err => {
            res.status(500).send({ error: err.message })
        })
}    
