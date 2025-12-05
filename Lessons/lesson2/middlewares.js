import fruits from './fruits.js'

// צורת כתיבה נוספת
// יעילה יותר - גלובלית
export const checkId = (req, res, next) => {
    const { id } = req.params

    let i = fruits.findIndex(x => x.id == id)
    if (i == -1) {
        return res.status(404).send({ error: `id is not found!` })
    }
    // שמירת נתונים באובייקט הבקשה
    req.index = i
    next()
}