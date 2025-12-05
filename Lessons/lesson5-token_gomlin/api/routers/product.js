import express from 'express'
import {
    calcPrice,
    comeToSet,
    create,
    getAll,
    getById,
    pricePerStudent,
    remove,
    select,
    update,
    welldone
} from '../controllers/product.js'

const router = express.Router()

router.get('', getAll)
router.get('/byId/:id', getById)
router.post('', create)
router.delete('/:id', remove)
router.patch('/:id', update)
router.get('/calcPrice/:num', calcPrice)
router.get('/pricePerStudent', pricePerStudent)
router.get('/set', comeToSet)
router.get('/welldone', welldone)
router.get('/select', select)

export default router