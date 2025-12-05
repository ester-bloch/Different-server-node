// import fruits from './fruits.js'
/*
params-חובה כמו 2/ מוגדר בפונקציה עם נקודותיים
query- לא חובה לא מוגדר בפונקציה ?name=3&...
body-נסתר
*/
import { employees, managers } from "./Data.js";

export const checkCodeFromUrl = (req, res, next) => {
    
    const { code } = req.params;
    let i = employees.findIndex(x => x.code == code)
    if (i == -1) {
        return res.status(404).send({ error: `employee is not found!` })
    }
    req.index = i
    next()
}
export const checkCodeFromBody = (req, res, next) => {
    const { code } = req.body;
    let i = employees.findIndex(x => x.code == code)
    if (i == -1) {
        return res.status(404).send({ error: `code is not found!` })
    }
    req.index = i
    next()
}
export const checkExistingManagerFromQuery = (req, res, next) => {
    const { managerCode } = req.query;
    let manager = managers.find(x => x.code == managerCode)
    if (!manager) {
        return res.status(404).send({ error: `manager is not found!` })
    }
    next()
}
export const checkEmployeeBelongsToManager = (req, res, next) => {
    const { code } = req.query;
    const { managerCode } = req.query;

    let i = employees.find(x => x.code == code)
    if (!i) {
        return res.status(404).send({ error: `employee is not found!` })
    }
    if (i.managerCode != managerCode) {
        return res.status(404).send({ error: `employee does not belong to manager` })
    }
    // שמירת נתונים באובייקט הבקשה
    req.thisEmployee = i
    next()
}
