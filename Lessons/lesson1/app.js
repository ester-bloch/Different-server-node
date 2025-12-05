// צורת ייבוא ישנה
// const express = require('express')
// צורת הייצוא הישנה
// let x = 5
// module.exports = x

// מייבאים ספריה בשם הספריה- מקובל
// יש מקובליות מסוימות לשנות שם לספריה
// בתוך המחרוזת נכתוב את שם הספריה כמו שהתקנו אותה
import express from 'express'
// console.log('hello');

// יצירת שרת
const app = express()
const port = 3001

// endpoints - קריאת שרת
// app.route('/hello').get(() => {

// })

// app - שם השרת
// .get - שיטת גישה
// route - ניתוב
// פונקציה
// request - אובייקט הבקשה
// מכיל נתונים על קריאת השרת כולל מה שצד לקוח שולח
// response - אובייקט התגובה
// יכיל נתונים על התגובה של השרת
// דרכו נחזיר את התשובה
// ללא ניתוב - ברירת מחדל
app.get('', (req, res) => {
    res.send('👍😁❤😍')
})

app.get('/hello', (req, res) => {
    res.send('👍😁❤😍 hello')
})

app.get('/welcome', (req, res) => {
    res.send('welcome')
})

// שליחת פרמטרים בניתוב
// params - חלק מהניתוב
// מוגדר בניתוב
// אם לא ישלח - לא נגיע לפונקציה - לא מזוהה כזה ניתוב
app.get('/checkid/:id', (req, res) => {
    // req.params - מכיל את כל הפרמטרים שנשלחו בניתוב
    console.log(req.params);
    if (req.params.id.length == 9)
        return res.json({ message: 'valid id!' })
    res.json({ error: 'invalid id!' })
})

// query - פרמטרים בודדים / body - אובייקטים
// לא מוגדר בניתוב
// אם לא ישלח - נגיע לפונצקיה - אבל הפרמטר יגיע לא מוגדר - ריק

// query
// syntax - route?key1=value1&key2=value2
app.get('/checkid', (req, res) => {
    console.log(req);
    if (!req.query.id)
        return res.send({ error: 'id is required!' })
    if (req.query.id.length == 9)
        return res.json({ message: 'valid id!' })
    res.json({ error: 'invalid id!' })
})

app.get('/login', (req, res) => {
    if (!req.query.email || !req.query.password)
        return res.send({ error: 'email and password are required!' })
    if (req.query.email.indexOf('@') == -1)
        return res.json({ error: 'invalid email!' })
    if (req.query.password.length < 4)
        return res.json({ error: 'invalid password!' })
    res.json({ message: 'login successfully!' })
})


// יצירת מאזין
// בסוף הדף
app.listen(port, () => {
    console.log(`my application is running on http://localhost:${port}`)
})
