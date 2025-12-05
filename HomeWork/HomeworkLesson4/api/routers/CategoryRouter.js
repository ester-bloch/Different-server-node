import express from 'express'

//import { create ,getAll,getById,remove} from '../controllers/dishControll.js'
import { get } from 'mongoose'
import { getAll,create,getById,remove,update ,getDishes} from '../controllers/categoryControll.js'
const router = express.Router()

router.get('/',getAll)
router.get('/getDishes/:id',getDishes)
router.get('/:id',getById)
router.post('',create)
router.delete('/:id',remove)
router.patch('/:id',update)
export default router