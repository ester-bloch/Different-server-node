import Category from'../models/category.js';
export const getAll = (req, res) => {
    Category.find()
    .populate('apartments', 'name ')
   // const posts = await Posts.find().populate('authors', 'name'); 
    //.populate({ path:}}
    .then( (data)=>{
        res.status(200).send(data)
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

export const create = (req, res) => {
    console.log("הגעתי לקריאט")
    const { name}= req.body
    const newCategory=new Category({ name,apartments:[]})
    newCategory.save()
    .then(  (data)=>{
        res.status(200).send(data)
    })
    .catch(err => {
        res.status(500).send({ error: err.message })
    })

}