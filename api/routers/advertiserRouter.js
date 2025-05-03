import express from 'express'

import { login,register,getAll, update,getById} from '../controllers/advertiser.js'
const router = express.Router()

router.post('/login',login)
router.get('', (req, res) => {
    res.send('👍😁!!!!!❤😍')
})
router.post('/register',register)
//advertiser/update/${advertiser.email
router.patch ('/update/:email',update)
router.get('/getAll',getAll)
router.get('/ById/:id',getById)
export default router