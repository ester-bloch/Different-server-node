import Category from "./models/category.js"

export const categoryExists = (req, res, next) => {

    const { category } = req.body

    if (!category) {
        // אם מדובר בהוספה
        if (req.method == 'POST')
            return res.status(400).send({ error: 'category is required!' })
        // אם מדובר בעדכון
        else{
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