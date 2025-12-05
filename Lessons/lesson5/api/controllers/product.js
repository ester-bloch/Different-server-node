import Product from "../models/product.js"

export const getAll = (req, res) => {
    Product.find()
        // הפרמטר שמתקבל - הנתונים שחזרו מהשליפה
        .then(data => {
            res.status(200).send(data)
        })
        // הפרמטר שמתקבל - אובייקט שגיאה
        .catch(err => {
            res.status(500).send({ error: err.message })
        })
}

export const getById = (req, res) => {
    // findById - Find - עובדת לפי המפתח הראשי
    Product.findById(req.params.id)
        .then(p => {
            if (!p) {
                return res.status(404).send({ error: 'article not found!' })
            }
            res.status(200).send(p)
        })
        .catch(err => {
            res.status(500).send({ error: err.message })
        })
}

// where - סינון של אובייקטים

export const calcPrice = (req, res) => {
    // חישוב של הסכום הכללי
    Product.find()
        .then(products => {
            let sum = 0
            products.forEach(p => {
                sum += p.price
            });
            res.status(200).send({ sumPerStudent: sum / req.params.num })
        })
        .catch(err => {
            res.status(500).send({ error: err.message })
        })
}

export const pricePerStudent = (req, res) => {
    // הודעה לכל הבנות שצריכות להביא כסף למסיבה - כמה
    Product.find()
        // סינון
        // ורק אחכ שליפה
        .where({ price: { $lt: 20 } })
        .then(products => {
            let data = []
            products.forEach(p => {
                // מתבצעת שליפה של כל האובייקטים
                // ורק אחכ סינון
                // if (p.price < 20)
                data.push({ name: p.brings, message: `you need to bring ${20 - p.price} shekels to the party` })
            });
            res.status(200).send(data)
        })
        .catch(err => {
            res.status(500).send({ error: err.message })
        })
}

export const comeToSet = (req, res) => {
    // כל בת שמביאה פחות מ 20 מוצרים - קל לה לסחוב
    // וגם מביאה מוצר בפחות מ 15 שח
    // לכן צריכה לבוא לעזור בעריכה

    Product.find()
        // .where({ price: { $lte: 15 } })
        // .where({ amount: { $lt: 20 } })

        .where({
            $and: [
                { price: { $lte: 15 } },
                { amount: { $lt: 20 } }
            ]
        })
        .then(products => {
            let data = []
            products.forEach(p => {
                data.push({ name: p.brings, message: `you need to come to help on setting` })
            });
            res.status(200).send(data)
        })
        .catch(err => {
            res.status(500).send({ error: err.message })
        })
}

export const welldone = (req, res) => {
    // צלש לבנות שמתאמצות

    Product.find()
        .where({
            $or: [
                { price: { $lte: 15 } },
                { amount: { $lt: 20 } }
            ]
        })
        .then(products => {
            let data = []
            products.forEach(p => {
                data.push({ name: p.brings, message: `צלש!` })
            });
            res.status(200).send(data)
        })
        .catch(err => {
            res.status(500).send({ error: err.message })
        })
}

// select - סינון שדות

// הודעת תזכורת - שם, מה להביא, כמות
export const select = (req, res) => {
    Product.find()
        // מקבל מחרוזת שמכילה את שמות השדות שנרצה לשלוף
        // או במינוס שמות השדות שלא נרצה לשלוף
        // א"א להגדיר גם מה כן וגם מה לא
        // הוא נעכס _id השדה 
        // עד שלא נגיד לו לא לבוא הוא יבוא
        // יוצא מן הכלל הקודם - מותר להגיד לו לא לבוא גם אם מגדירים מי יבוא
        // דוגמה - מי בא
        // .select('-_id description brings amount -price')
        // דוגמה מי לא בא
        // .select('-_id -price -__v')
        // דרך נוספת - אובייקט ג'סון
        // 1 - לשלוף 
        // 0 - לא לשלוף
        .select({ description: 1, amount: 1, brings: 1, _id: 0 })
        .then(products => {
            res.status(200).send(products)
        })
        .catch(err => {
            res.status(500).send({ error: err.message })
        })
}

export const create = (req, res) => {

    const { description, amount, price, brings } = req.body

    // יצירת אובייקט חדש
    const product = new Product({
        description,
        amount,
        price,
        brings
    })

    // פונקציית השמירה במסד מתבצעת על האובייקט בשונה מפונצקיות אחרות שמתבצעות על המודל
    // השמירה תתבצע במודל - לפי הקצאת האובייקט
    product.save()
        .then(p => {
            res.status(200).send(p)
        })
        .catch(err => {
            res.status(500).send({ error: err.message })
        })
}

export const remove = (req, res) => {

    Product.findByIdAndDelete(req.params.id)
        .then(p => {
            res.status(200).send({ message: `delete product ${p._id} succeed!` })
        })
        .catch(err => {
            res.status(500).send({ error: err.message })
        })
}

export const update = (req, res) => {

    const { id } = req.params

    Product.findByIdAndUpdate(id, req.body, { new: true })
        .then(p => {
            res.status(200).send({ message: `update product ${p._id} succeed!`, p })
        })
        .catch(error => {
            res.status(500).send({ error: error.message })
        })
}