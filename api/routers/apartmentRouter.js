import express from 'express'

import{create,getAll, getByCity,getById,getByPriceLessThan1000,getByPriceEqualTo1000,getByPriceMoreThan1000,remove,update,getBedsLessThan4,getBedsMoreThan4,getByAdvertiser,getByCategory,} from '../controllers/apartment.js'
import { checkAuth } from '../middlewares.js'
const router = express.Router()

router.get('', (req, res) => {
    res.send('👍😁!!!!!❤😍')
})
//כאן זה עם בדיקת טוקן
//לזכור לשנות חזרה את ההסלשה!
// router.patch('/update/:id',checkAuth,update)
router.patch('/update/:id',update)
router.get('/getAll',getAll)
router.get('/getByCity/:city',getByCity)
router.get('/ById/:id',getById)
router.get('/getByPriceLessThan1000',getByPriceLessThan1000)
router.get('/getByPriceEqualTo1000',getByPriceEqualTo1000)
router.get('/getByPriceMoreThan1000',getByPriceMoreThan1000)
router.get('/getBedsLessThan4',getBedsLessThan4)
router.get('/getBedsMoreThan4',getBedsMoreThan4)
router.get('/getByAdvertiser/:id',checkAuth,getByAdvertiser)
// router.get('/getByAdvertiser/:id',getByAdvertiser)
router.get('/getByCategory/:categoryId',getByCategory)
// router.post('',checkAuth,create)
router.post('',create)
router.patch ('/:id',checkAuth,update)
//לזכור לשנות חזרה את ההסלשה!
// router.delete('/:id',checkAuth,remove)
router.delete('/:id',remove)



// router.get('/update/:id',create)
// router.get('/getAll',getAll)
// router.get('/getByCity/:city',getByCity)
// router.get('/getByAdvertiser/:advertiserId',getByAdvertiser)
// router.get('/ById/:id',getById)
// router.get('/getByPriceLessThan1000',getByPriceLessThan1000)
// router.get('/getByPriceEqualTo1000',getByPriceEqualTo1000)
// router.get('/getByPriceMoreThan1000',getByPriceMoreThan1000)
// router.get('/getBedsLessThan4',getBedsLessThan4)
// router.get('/getBedsMoreThan4',getBedsMoreThan4)
// router.get('/getByCategory/:categoryId',getByCategory)
// router.post('',create)
// router.delete('/:id',remove)
// router.put('/:id',checkAuth,update)

export default router
