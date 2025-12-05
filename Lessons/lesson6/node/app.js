import express from 'express'
// npm i body-parser
import bodyParser from 'body-parser'
import mongoose from 'mongoose'
// npm i dotenv
import dotenv from 'dotenv'
// npm i cors
import cors from 'cors'

import articleRouter from './api/routers/article.js'
import categoryRouter from './api/routers/category.js'
import productRouter from './api/routers/product.js'
import userRouter from './api/routers/user.js'
import { checkAuth } from './api/middlewares.js'

// יצירת שרת
const app = express()
const port = 3001

// המנגנון מכיר את כל משתני הסביבה בכל הפרויקט
dotenv.config()

app.use(cors())

// uri - מחרוזת חיבור למסד נתונים מהשרת
// uri = mongodb://localhost:27017/

mongoose.connect(process.env.URI)
    .then(() => {
        console.log('connect to mongoDB');
    })
    .catch(err => {
        console.error({ error: err.message })
    })

app.use(bodyParser.json())

// יעביר לראוטר של המאמרים /article כל ניתוב שיתחיל ב 
app.use('/category', checkAuth, categoryRouter)
app.use('/article', articleRouter)
app.use('/product', productRouter)
app.use('/user', userRouter)

// יצירת מאזין
// בסוף הדף
app.listen(port, () => {
    console.log(`my application is running on http://localhost:${port}`)
})
