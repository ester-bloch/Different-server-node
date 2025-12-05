// router - controller

import express from 'express'
import {
    getAll,
    login,
    register
} from '../controllers/user.js'

const router = express.Router()

router.get('', getAll)
router.post('/register', register)
router.post('/login', login)

export default router