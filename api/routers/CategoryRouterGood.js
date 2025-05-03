import express from 'express'
import {create,getAll,update} from '../controllers/category.js'


const router = express.Router()

router.get('', (req, res) => {
    res.send('👍😁!!!!!❤😍')
})
router.get('/getAll',getAll)
router.post('',create)
router.put('/:id',update)

export default router