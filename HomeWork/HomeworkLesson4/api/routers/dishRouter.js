import express from 'express'

import { create ,getAll,getById,remove,update,byTaste,lessCal} from '../controllers/dishControll.js'
const router = express.Router()

router.get('',getAll)
router.get('/:id',getById)
router.get('/bytaste/:taste',byTaste)
router.get('/lesscal/:cal', lessCal)
router.patch('/:id',update)
router.post('',create)
router.delete('/:id',remove)
export default router