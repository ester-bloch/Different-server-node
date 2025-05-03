import express from 'express'

import {getAll,getWeather,create,getById,update} from '../controllers/city.js'
const router = express.Router()

router.get('', (req, res) => {
    res.send('👍😁!!!!!❤😍')
})
router.get('/getWeather/:city',getWeather)
router.get('/getAll',getAll)
router.get('/byid/:id',getById)
router.patch('/:id',update)
router.post('',create)

// router.get('/bytaste/:taste',byTaste)
// router.get('/lesscal/:cal', lessCal)
// router.patch('/:id',update)
// router.post('',create)
// router.delete('/:id',remove)
export default router
