import express from 'express'
// npm i body-parser
import bodyParser from 'body-parser'

// ייבוא מקובץ - חובה להוסיף סיומת לקובץ
import fruits from './fruits.js'
import { checkId } from './middlewares.js'

// יצירת שרת
const app = express()
const port = 3001

// middlwares
// תכנות ביניים
// קוד שקורה לפני שמגיעים לפונקציה
// הקוד עובר בכל מידלוור שמתאים לניתוב עד שנעצר או שמגיע לקריאת שרת שרצינו לפי הניתוב
// שימושים עיקריים:
// קוד שלא שייך ישירות לפונקציונאליות של קריאת השרת
// חסכון בקוד
// Jwt - הרשאות גישה 
// סימנים:
// use - לא תמיד קיים
// next - חובה

// ברירת מחדל - מופעל לפני כל ניתוב
// ללא ניתוב או ניתוב ריק
app.use(bodyParser.json())

app.use('/all', (req, res, next) => {
    console.log('all');
    // בדיקות
    // עדכונים לאובייקט הבקשה
    // בחירה:
    // או שמסיימים את הקריאה - res
    // או ששולחים הלאה - next
    next()
})

app.use('/all', (req, res, next) => {
    console.log('all 2');
    next()
})

// בדיקה שהקוד שנשלח קיים
// app.use('/byid/:id', (req, res, next) => {
//     const { id } = req.params
//     let i = fruits.findIndex(x => x.id == id)
//     if (i == -1) {
//         return res.status(404).send({ error: `id is not found!` })
//     }
//     // שמירת נתונים באובייקט הבקשה
//     req.index = i
//     next()
// })

// app.use('/remove/:id', (req, res, next) => {
//     const { id } = req.params
//     let i = fruits.findIndex(x => x.id == id)
//     if (i == -1) {
//         return res.status(404).send({ error: `id is not found!` })
//     }
//     // שמירת נתונים באובייקט הבקשה
//     req.index = i
//     next()
// })

// endpoints - קריאת שרת

// get - לא מקבל אובייקטים בגוף הבקשה
// get - query
// post - body

// body => row => json
app.post('/login', (req, res) => {
    const { email, password } = req.body

    if (!email || !password)
        return res.send({ error: 'email and password are required!' })
    if (email.indexOf('@') == -1)
        return res.json({ error: 'invalid email!' })
    if (password.length < 4)
        return res.json({ error: 'invalid password!' })
    res.json({ message: 'login successfully!' })
})

// get all fruits
app.get('/all', (req, res) => {
    res.status(200).send(fruits)
})
// get by id
app.get('/byId/:id', checkId, (req, res) => {
    res.status(200).send(fruits[req.index])
})
// get by filters
app.get('/filter', (req, res) => {

    const { color, taste } = req.query

    let list = fruits.filter(f =>
        (!color || f.color === color)
        && (!taste || f.taste === taste)
    )
    res.status(200).send(list)
})
// add fruit
app.post('/add', (req, res) => {

    const { desc, color, taste } = req.body

    let f = fruits.find(x => x.desc === desc && x.color === color && x.taste)

    if (f) {
        return res.status(400).send({ error: `fruit has already been existed!` })
    }

    const fruit = {
        id: fruits[fruits.length - 1].id + 1,
        desc,
        color,
        taste
    }

    fruits.push(fruit)
    res.status(200).send(true)
})

// delete
app.delete('/remove/:id', checkId, (req, res) => {
    // מחיקה מאינדקס מסוים כמות איברים
    fruits.splice(req.index, 1)

    res.status(200).send(true)
})
// יצירת מאזין
// בסוף הדף
app.listen(port, () => {
    console.log(`my application is running on http://localhost:${port}`)
})
