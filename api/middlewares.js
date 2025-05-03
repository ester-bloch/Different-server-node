import jwt from "jsonwebtoken"
import Apartment from "./models/apartment.js";

export const checkAuth = (req, res, next) => {
    console.log(req.headers.authorization)
    if (!req.headers.authorization) {
        // authorization - הרשאה
        return res.status(401).send({ error: 'Authorization failed1!' })
    }
    const arr = req.headers.authorization.split(' ')
    if (arr.length == 0) {
        return res.status(401).send({ error: 'Authorization failed2!' })
    }
    // עד כאן בדיקה שהטוקן קיים
    const [,token] = arr
    // jwt.verify - אימות// בדיקה שהטוקן תקין ותקף
    // callback בפונקציית ה 
    // 1. שגיאה
    // 2. אובייקט מפוענח - מכיל את הנתןנים ששמרנו על המשתמש
    // jwt.verify(token, process.env.SECRET, (error, decoded) => {
    jwt.verify(token, "d76FBHJ76*y87", (error, decoded) => {
        if (error || !decoded) {
            // Authentication - אימות
            // return res.status(401).send({ error: 'Authentication failed!' })
            return res.status(401).send({ error: error.message,desp: "לא תקין ותקף",token:token})
        }
        console.log('decoded: ', decoded)
        if (req.method == 'DELETE' || req.method == 'PUT')
            checkOwnerDetailes(req, res, next, decoded)
        //decoded:  { email: '11@gmail.com', iat: 1737833049, exp: 1737836649 }
        // יתכן שנרצה כאן לשמור נתונים באובייקט הבקשה
        next()
    })

}
export const checkOwnerDetailes = (req, res, next, decoded) => {
    console.log("checkOwnerDetailesנכנסתי ל")
    const id = req.params.id
    Apartment.findById(id)
        .populate({ path: 'advertizer', select: 'email ' }).
        then((apar) => {
            if (apar!=null && apar.advertizer.email && adver.email == apar.advertizer.email)
               return  next()
            else {
                return res.status(404).send({ error: 'apartment is not found! (from middleware)' })
            }
        })
        .catch((err) => {
            return res.status(500).send({ place: "checkOwnerDetailes בסוף", "error": err })
        })
}

