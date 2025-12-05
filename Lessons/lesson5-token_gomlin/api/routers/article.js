// router - controller

import express from 'express'
import {
    create,
    getAll,
    getById,
    remove,
    update
} from '../controllers/article.js'
import { categoryExists } from '../middlewares.js'

const router = express.Router()

router.get('', getAll)
router.get('/:id', getById)
router.post('', categoryExists, create)
router.delete('/:id', remove)
router.patch('/:id', categoryExists, update)

export default router