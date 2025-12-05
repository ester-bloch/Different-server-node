
import express from 'express'
import bodyParser from 'body-parser'//התקנה בשביל להמיר לגיסון את הבאדי
import mongoose from 'mongoose'
import routerOfDish from './api/routers/dishRouter.js'
import routerOfCategory from './api/routers/CategoryRouter.js'
const app = express()
app.use(bodyParser.json())//ממיר את כל המידע לג'יסון
const port = 3001

/*
params-חובה כמו 2/ מוגדר בפונקציה עם נקודותיים
query- לא חובה לא מוגדר בפונקציה ?name=3&...
body-נסתר
*/
mongoose.connect(`mongodb://localhost:27017/DishesDB`)
    .then(() => {
        console.log('connect to mongoDB')
    })
    .catch(err => {
        console.error({ error: err.mongoose })
    })
app.get('', (req, res) => {
    res.send('👍😁❤😍')
})
app.use('/dish', routerOfDish)
app.use('/category', routerOfCategory)
// יצירת מאזין
// בסוף הדף
app.listen(port, () => {
    console.log(`my application is running on http://localhost:${port}`)
})

