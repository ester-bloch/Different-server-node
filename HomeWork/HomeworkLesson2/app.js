
import express from 'express'
import bodyParser from 'body-parser'//התקנה בשביל להמיר לגיסון את הבאדי
import { checkCodeFromUrl, checkEmployeeBelongsToManager, checkExistingManagerFromQuery } from './MiddleWare.js'
import { employees } from './Data.js'
//import { checkId } from './Lessons/lesson2/middlewares'

const app = express()
app.use(bodyParser(JSON))//ממיר את כל המידע לג'יסון
const port = 3001


app.get('', (req, res) => {
    res.send("try worked!!!")
})
app.get('/checkid/:id', (req, res) => {
    console.log(req.params);
    if (req.params.id.length == 9)
        return res.json({ message: 'valid id!' })
    res.json({ error: 'invalid id!' })
})
app.get('/hello', (req, res) => {
    3.
    res.send('👍😁❤😍 hello')
})

app.get('/welcome', (req, res) => {
    res.send('welcome')
})

app.get('/checkid/:id', (req, res) => {
    console.log(req.params);
    if (req.params.id.length == 9)
        return res.json({ message: 'valid id!' })
    res.json({ error: 'invalid id!' })
})

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


//שיעורי בית שיעור 2
//1.
app.get("/allEmps", (req, res) => {
    res.status(200).send(employees)
})
//2.
app.get('/bycode/:code', checkCodeFromUrl, (req, res) =>
    res.status(200).send(employees[req.index])
)
//3. הוספת עובד
app.post('/addEmp', checkExistingManagerFromQuery, (req, res) => {

    const { tz, firstName, lastName, phoneNumber, salary } = req.body

    //req.indexManager
    const { managerCode } = req.query;
    let found = employees.find(x => x.tz === tz)

    if (found) {
        return res.status(400).send({ error: `employee is already existed!` })
    }

    const newEmp = {
        code: employees[employees.length - 1].code + 1,
        tz, firstName, lastName, phoneNumber, salary,
        managerCode
    }

    employees.push(newEmp)
    res.status(200).send(true)
})
//4.פונקציות מחיקה לפי ת.ז של העובד - רק ע"י המנהל של העובד.(2, 3)
//http://localhost:3001/delete?managerCode=1&code=1
app.delete('/delete', checkExistingManagerFromQuery, checkEmployeeBelongsToManager, (req, res) => {
    const { code } = req.query;
    employees.splice(employees.findIndex((p) => p.code == code), 1)
    res.status(200).send(true)
})
//5.פונקציות עדכון  לפי ת.ז של העובד - רק ע"י המנהל של העובד.(2, 3)
app.put('/update', checkExistingManagerFromQuery, checkEmployeeBelongsToManager, (req, res) => {
    const { code, managerCode } = req.query;
    const { tz, firstName, lastName, phoneNumber, salary } = req.body
    let thisEmployee = employees.find(p=>p.code==code)
    if(tz!=undefined)thisEmployee.tz=tz
    if(firstName!=undefined)thisEmployee.firstName=firstName
    if(lastName!=undefined)thisEmployee.lastName=lastName
    if(phoneNumber!=undefined)thisEmployee.phoneNumber=phoneNumber
    if(salary!=undefined)thisEmployee.salary=salary
    if(managerCode!=undefined)thisEmployee.managerCode=managerCode
    res.status(200).send(thisEmployee)
})

// יצירת מאזין
// בסוף הדף
app.listen(port, () => {
    console.log(`my application is running on http://localhost:${port}`)
})

