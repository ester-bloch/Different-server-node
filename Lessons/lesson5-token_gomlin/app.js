import express from 'express'
// npm i body-parser
import bodyParser from 'body-parser'
import mongoose from 'mongoose'

import articleRouter from './api/routers/article.js'
import categoryRouter from './api/routers/category.js'
import productRouter from './api/routers/product.js'
import userRouter from './api/routers/user.js'

// יצירת שרת
const app = express()
const port = 3001

// uri - מחרוזת חיבור למסד נתונים מהשרת
// uri = mongodb://localhost:27017/

mongoose.connect(`mongodb://localhost:27017/ArticlesDB`)
    .then(() => {
        console.log('connect to mongoDB');
    })
    .catch(err => {
        console.error({ error: err.message })
    })

app.use(bodyParser.json())

// יעביר לראוטר של המאמרים /article כל ניתוב שיתחיל ב 
app.use('/category', categoryRouter)
app.use('/article', articleRouter)
app.use('/product', productRouter)
app.use('/user', userRouter)
//app.use('/', userRouter)

// יצירת מאזין
// בסוף הדף
app.listen(port, () => {
    console.log(`my application is running on http://localhost:${port}`)
})
