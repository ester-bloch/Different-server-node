
import express from 'express'
import bodyParser from 'body-parser'//התקנה בשביל להמיר לגיסון את הבאדי
import  mongoose from 'mongoose'
import routerOfAdvertizer from './api/routers/advertiserRouter.js'
import routerOfCity from './api/routers/cityRouter.js'
import routerOfapartment from './api/routers/apartmentRouter.js'
import routerOfcategory from './api/routers/CategoryRouterGood.js'
import cors from 'cors'
import dotenv from 'dotenv' //  default settings      


const app = express()
const port = 3001

// dotenv.config()
app.use(cors())

process.env.LOCAL_URI_APARTMENTS
mongoose.connect(`mongodb://localhost:27017/ApartmentDB`)
    .then(() => {
        console.log('connect to mongoDB');
    })
    .catch(err => {
        console.error({ error: err.message })
    })

app.use(bodyParser.json())


/*
params-חובה כמו 2/ מוגדר בפונקציה עם נקודותיים
query- לא חובה לא מוגדר בפונקציה ?name=3&...
body-נסתר
*/
// mongoose.connect(`mongodb://localhost:27017/DishesDB`)
//     .then(() => {
//         console.log('connect to mongoDB')
//     })
//     .catch(err => {
//         console.error({ error: err.mongoose })
//     })
app.get('', (req, res) => {
    res.send('👍😁❤😍')
})
app.use('/advertiser', routerOfAdvertizer)
app.use('/apartment', routerOfapartment)
app.use('/city', routerOfCity)
app.use('/category', routerOfcategory)

// Middleware לבדוק אם התגובה כבר נשלחה
const preventMultipleResponses = (req, res, next) => {
    res.hasSent = false; // דגל לבדוק אם התגובה נשלחה

    const originalSend = res.send.bind(res);
    res.send = function (...args) {
        if (this.hasSent) {
            console.warn('Attempted to send multiple responses');
            return; // לא לשלוח תגובה נוספת
        }
        this.hasSent = true; // עדכן שהתגובה נשלחה
        return originalSend(...args); // שלח את התגובה המקורית
    };

    next(); // המשך למידלואר הבא
};
app.use(preventMultipleResponses); 
app.use((err, req, res, next) => {
    console.error(err.stack); // הדפס את השגיאה לקונסול
    res.status(500).send({ error: 'Something went wrong!' }); // שלח תשובת שגיאה ללקוח
});
app.listen(port, () => {
    console.log(`my application is running on http://localhost:${port}`)
})

