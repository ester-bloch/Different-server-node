// router - controller

import express from 'express'
import {
    create,
    getAll,
    getById,
    remove,
    update
} from '../controllers/article.js'
import { categoryExists, checkAuth } from '../middlewares.js'

const router = express.Router()

router.get('', getAll)
router.get('/:id', getById)
router.post('', checkAuth, categoryExists, create)
router.delete('/:id', remove)
router.patch('/:id', categoryExists, update)

export default router