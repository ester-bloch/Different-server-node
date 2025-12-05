import fs from 'fs'

// console.log('start');

// // readFile - מוגדרת כאסינכרונית
// // שימוש בצורה זו נתן שגיאה שאין העמסה כזו של פרמטרים
// // let text = fs.readFile('text.txt', 'utf8')

// // 1. callback פונקציית 
// fs.readFile('text.txt', 'utf8', (err, text) => {
//     if (err) {
//         console.error(err);
//     }
//     if (text) {
//         console.log({ text });
//     }
// })

// // 2. async await
// let textSync = await fs.readFileSync('text.txt', 'utf8')

// console.log({ textSync });

// // 3. promise

// let fsp = fs.promises
// fsp.readFile('text.txt', 'utf8')
//     .then(textPromise => {
//         console.log({ textPromise });
//     })
//     .catch(error => {
//         console.error({ error });
//     })

// console.log('finish');

// create promise:
function func(num1, num2) {
    for (let i = 1; i < num1 * num1; i++) {
        if (i % (num2 * num2) == 0) {
            return i
        }
    }
    return null
}

// let result = func(5000, 78)

// console.log({ result });

// create callback

// function funcCB(num1, num2, cb) {
//     let result = 0
//     for (let i = 1; i < num1 * num1 && result == 0; i++) {
//         if (i % (num2 * num2) == 0) {
//             result = i
//         }
//     }
//     if (result != 0) {
//         cb(null, result)
//     }
//     else {
//         cb({ error: 'not found' }, null)
//     }
// }

// funcCB(5000, 7800, (err, res) => {
//     if (err) {
//         console.log(err);
//     }
//     if (res) {
//         console.log(res);
//     }
// })

// console.log('finish');

function funcPromise(num1, num2) {
    // const promise = new Promise((resolve, reject) => {
    return new Promise((resolve, reject) => {
        let result = 0
        for (let i = 1; i < num1 * num1 && result == 0; i++) {
            if (i % (num2 * num2) == 0) {
                result = i
            }
        }
        if (result != 0) {
            // נגדיר מה נקרא מקרה של הצלחה
            // מה נרצה להחזיר במקרה של הצלחה
            resolve(result)
        }
        else {
            // נגדיר מה נקרא מקרה של כשלון
            // נגידר מה נחזיר במקרה של כשלון
            reject({ error: 'not found' })
        }
    })

    // return promise
}

funcPromise(5000, 7800)
    // resolve / reject - הפרומיס יזהה מה חזר 
    // then / catch ויכנס בהתאמה ל
    .then(x => {
        console.log(x);
    })
    .catch(err => {
        console.error(err);
    })

console.log('finish');
