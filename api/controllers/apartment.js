import Apartment from "../models/apartment.js"
import Category from "../models/category.js"
import City from "../models/city.js"
import Advertiser from "../models/advertiser.js"

export const create = async (req, res) => {
    const { name, description, category, city, advertiser, address, numbeds, more, price, picture } = req.body;

    // בדיקת קלט
    if (!name) {
        return res.status(400).send({ error: "Missing required fields" });
    }

    try {
        const newApartment = new Apartment({ name, description, category, city, advertiser, picture, address, numbeds, more, price });
        const data = await newApartment.save();

        await Promise.all([
            category && Category.findByIdAndUpdate(category, { $push: { apartments: data._id } }),
            city && City.findByIdAndUpdate(city, { $push: { apartments: data._id } }),
            advertiser && Advertiser.findByIdAndUpdate(advertiser, { $push: { apartments: data._id } })
        ]);

        res.status(200).send(data);
    } catch (err) {
        console.error(err); // הדפס את השגיאה לקונסול
        res.status(500).send({ error: err.message });
    }
}


// export const create = (req, res) => {
//     const { name, description, category, city, advertiser, address, numbeds, more, price, picture} = req.body
//     const newApartment = new Apartment({ name, description, category, city, advertiser, picture,address, numbeds, more, price, })
//     newApartment.save()
//         .then(async (data) => {
//             await Category.findByIdAndUpdate(category, { $push: { apartments: data._id } })
//             await City.findByIdAndUpdate(city, { $push: { apartments: data._id } })
//             await Advertiser.findByIdAndUpdate(advertiser, { $push: { apartments: data._id } })
//             res.status(200).send(data)
//         })
//         .catch(err => {
//             res.status(500).send({ error: err.message })
//         })

// }
export const update = async (req, res) => {
    const { id } = req.params;

    try {
        const oldData = await Apartment.findById(id);
        if (!oldData) {
            return res.status(404).send({ error: "Apartment not found" });
        }

        const { category, city, advertiser } = req.body;

        // עדכון הדירה
        const updatedApartment = await Apartment.findByIdAndUpdate(id, req.body, { new: true });

        const promises = [];

        if (category) {
            promises.push(Category.findByIdAndUpdate(category, { $push: { apartments: updatedApartment._id } }));
            promises.push(Category.findByIdAndUpdate(oldData.category, { $pull: { apartments: oldData._id } }));
        }

        if (city) {
            promises.push(City.findByIdAndUpdate(city, { $push: { apartments: updatedApartment._id } }));
            promises.push(City.findByIdAndUpdate(oldData.city, { $pull: { apartments: oldData._id } }));
        }

        if (advertiser) {
            promises.push(Advertiser.findByIdAndUpdate(advertiser, { $push: { apartments: updatedApartment._id } }));
            promises.push(Advertiser.findByIdAndUpdate(oldData.advertiser, { $pull: { apartments: oldData._id } }));
        }

        await Promise.all(promises);

        res.status(200).send({ message: `Update apartment ${updatedApartment._id} succeeded!` });
    } catch (error) {
        res.status(500).send({ error: error.message, sender: "update apartment - שגיאה בעדכון דירה" });
    }
}

export const remove = async (req, res) => {
    const id = req.params.id;
    console.log("id:!!!!!!!!!!")
    console.log(id)

    // בדוק אם ה-ID תקין
    if (!id) {
        return res.status(400).send({ error: 'ID is required' });
    }

    let responseSent = false; // משתנה לבדוק אם התגובה נשלחה

    try {
        const apart = await Apartment.findById(id).populate({ path: 'advertiser', select: 'email ' });

        if (!apart) {
            responseSent = true;
            return res.status(404).send({ error: 'Apartment is not found!' });
        }

        await apart.deleteOne();

        await Promise.all([
            Category.findByIdAndUpdate(apart.category, { $pull: { apartments: apart._id } }),
            City.findByIdAndUpdate(apart.city, { $pull: { apartments: apart._id } }),
            Advertiser.findByIdAndUpdate(apart.advertiser, { $pull: { apartments: apart._id } })
        ]).catch(err => {
            console.error(err); // טיפול בשגיאות עבור עדכונים
            if (!responseSent) {
                responseSent = true;
                return res.status(500).send({ error: 'An error occurred while updating related entities.' });
            }
        });

        if (!responseSent) {
            return res.send({ message: `Delete apartment ${apart._id} succeed!` });
        }

    } catch (err) {
        console.error(err); // הדפס את השגיאה לקונסול
        if (!responseSent) { // בדוק אם הכותרות כבר נשלחו
            return res.status(500).send({ error: 'An error occurred while deleting the apartment.' });
        }
    }
}




export const getAll = (req, res) => {
    Apartment.find()
        .populate({ path: 'category', select: 'name _id' })
        .populate({ path: 'city', select: 'name _id' })
        .populate({ path: 'advertiser', select: 'email phonrNumber phoneNumber2 _id' })
        .then(data => {
            res.status(200).send(data)
        })
        .catch(err => {
            res.status(500).send({ error: err.message })
        })
}

export const getById = (req, res) => {
    Apartment.findById(req.params.id)
        .populate({ path: 'category', select: 'name -_id' })
        .populate({ path: 'city', select: 'name -_id' })
        .populate({ path: 'advertiser', select: 'email phonrNumber phoneNumber2 -_id' })
        .then(data => {
            if (!data) {
                return res.status(404).send({ error: 'apartment not found!' })
            }
            res.status(200).send(data)
        })
        .catch(err => {
            res.status(500).send({ error: err.message })
        })
}



export const getByCategory = (req, res) => {
    Category.findById(req.params.categoryId)
        .populate('apartments', " city category name advertiser",)

        .then(data => {
            res.status(200).send(data)
        })
        .catch(err => {
            res.status(500).send({ error: err.message })
        })
}
export const getByCity = (req, res) => {
    const { city } = req.params
    console.log(city)
    City.findById(city)
        .populate('apartments', "name city category advertiser")
        .then(data => {
            res.status(200).send(data)
        })
        .catch(err => {
            res.status(500).send({ error: err.message })
        })
}
export const getByAdvertiser = (req, res) => {
    console.log("יתעגה ", req.params.id);
    Advertiser.findById(req.params.id)
        .populate({
            path: 'apartments',
            select: 'city advertiser category name description more',
            populate: [
                { path: 'category', select: 'name _id' },
                { path: 'city', select: 'name _id' },
                { path: 'advertiser', select: 'email phoneNumber phoneNumber2 -_id' }
            ]
        })
        .then(data => {
            console.log(data.apartments);
            res.status(200).send(data.apartments);
        })
        .catch(err => {
            res.status(500).send({ error: err.message });
        });
}

// export const getByAdvertiser = (req, res) => {
//     console.log("יתעגה ", req.params.id)
//     Advertiser.findById(req.params.id)
//         .populate('apartments', "city advertiser category name description more")
//         .populate({ path: 'apartments.category', select: 'name _id' })
//         .populate({ path: 'apartments.city', select: 'name _id' })
//         .populate({ path: 'apartments.advertiser', select: 'email phonrNumber phoneNumber2 -_id' })
//         .then(data => {
//             console.log(data.apartments)
//             res.status(200).send(data.apartments)
//         })
//         .catch(err => {
//             res.status(500).send({ error: err.message })
//         })
// }
/*שליפות – 
•	שליפת כל הדירות
•	שליפת דירה לפי קוד
•	שליפת דירות לפי קוד קטגוריה
•	שליפת דירות לפי קוד עיר
•	שליפת דירות לפי קוד מפרסם 
•	שליפת דירות לפי כמות מיטות (גדולה מ / קטנה מ / שווה ל פונקציות דומות, אבל עם תנאי שונה...)
•	שליפת דירות לפי מחיר (גדול מ / קטן מ - כנ"ל)
*/
// Product.find()
// // .where({ price: { $lte: 15 } })
// // .where({ amount: { $lt: 20 } })

// .where({
//     $and: [
//         { price: { $lte: 15 } },
//         { amount: { $lt: 20 } }
//     ]
// })


/*צרי פונקציות שליפה:
כל המנות לפי טעם מסוים (פרמטר)
כל המנות שיש להן פחות קלוריות מ... (פרמטר)
 .where({
            $and: [
                { price: { $lte: 15 } },
                { amount: { $lt: 20 } }
            ]

 .where({
            $or: [
                { price: { $lte: 15 } },
                { amount: { $lt: 20 } }
            ]
        })
        .where({ price: { $lt: 20 } })
 */
export const getBedsLessThan4 = (req, res) => {
    Apartment.find()
        .populate({ path: 'category', select: 'name -_id' })
        .populate({ path: 'city', select: 'name -_id' })
        .populate({ path: 'advertiser', select: 'email phonrNumber phoneNumber2 -_id' }).where({ numbeds: { $lte: 4 } })
        .then(data => {
            res.status(200).send(data)
        })
        .catch(err => {
            res.status(500).send({ error: err.message })
        })
}
export const getBedsMoreThan4 = (req, res) => {
    Apartment.find()
        .populate({ path: 'category', select: 'name -_id' })
        .populate({ path: 'city', select: 'name -_id' })
        .populate({ path: 'advertiser', select: 'email phonrNumber phoneNumber2 -_id' }).where({ numbeds: { $mte: 4 } })
        .then(data => {
            res.status(200).send(data)
        })
        .catch(err => {
            res.status(500).send({ error: err.message })
        })
}
export const getByPriceMoreThan1000 = (req, res) => {
    Apartment.find()
        .populate({ path: 'category', select: 'name -_id' })
        .populate({ path: 'city', select: 'name -_id' })
        .populate({ path: 'advertiser', select: 'email phonrNumber phoneNumber2 -_id' })
        .where({ price: { $mt: 1000 } })
        .then(data => {
            res.status(200).send(data)
        })
        .catch(err => {
            res.status(500).send({ error: err.message })
        })
}
/**  Product.find()
         .where({ price: { $lte: 15 } })
         .where({ amount: { $lt: 20 } })
            או: 
        .where({
            $and: [
                { price: { $lte: 15 } },
                { amount: { $lt: 20 } }
            ]
        }) */
export const getByPriceLessThan1000 = (req, res) => {
    Apartment.find()
        .populate({ path: 'category', select: 'name -_id' })
        .populate({ path: 'city', select: 'name -_id' })
        .populate({ path: 'advertiser', select: 'email phonrNumber phoneNumber2 -_id' })
        .where({ price: { $lt: 1000 } })
        .then(data => {
            console.log("data.length: " + data.length)
            res.status(200).send(data)
        })
        .catch(err => {
            res.status(500).send({ error: err.message })
        })
}
export const getByPriceEqualTo1000 = (req, res) => {
    Apartment.find()
        .populate({ path: 'category', select: 'name -_id' })
        .populate({ path: 'city', select: 'name -_id' })
        .populate({ path: 'advertiser', select: 'email phonrNumber phoneNumber2 -_id' })
        .where({ price: { $eq: 1000 } })
        .then(data => {
            console.log("data.length: " + data.length)
            res.status(200).send(data)
        })
        .catch(err => {
            res.status(500).send({ error: err.message })
        })
}
export const filterApartments = async (req, res) => {
    const { maxBeds, city, advertiser, minPrice, maxPrice } = req.body;

    // יצירת אובייקט סינון
    const filter = {};

    // הוספת תנאים לסינון לפי פרמטרים שנשלחו
    if (maxBeds) {
        filter.numbeds = { $lte: maxBeds };
    }

    if (city) {
        filter.city = city; // נניח שהעיר היא ID של עיר
    }

    if (advertiser) {
        filter.advertiser = advertiser; // נניח שהמפרסם הוא ID של מפרסם
    }

    if (minPrice) {
        filter.price = { ...filter.price, $gte: minPrice }; // מחיר מינימלי
    }

    if (maxPrice) {
        filter.price = { ...filter.price, $lte: maxPrice }; // מחיר מקסימלי
    }

    try {
        const apartments = await Apartment.find(filter)
            .populate({ path: 'category', select: 'name -_id' })
            .populate({ path: 'city', select: 'name -_id' })
            .populate({ path: 'advertiser', select: 'email phonrNumber phoneNumber2 -_id' });

        res.status(200).send(apartments);
    } catch (err) {
        res.status(500).send({ error: err.message });
    }
};

export const getByFilter = async (req, res) => {
    const searchCriteria = req.body;
    console.log("searchCriteria: ", searchCriteria)
    if (searchCriteria.$and.city) {
        console.log("city: ", searchCriteria.$and.city)
        const city = await City.findOne({ name: searchCriteria.$and.city });
        if (city) {
            searchCriteria.city = city._id; 
            console.log(searchCriteria.city)
        } else {
            return res.status(404).json({ message: 'עיר לא נמצאה' });
        }        
    }
    try {
        const apartments = await Apartment.find(searchCriteria)
            .populate({ path: 'category', select: 'name _id' })
            .populate({ path: 'city', select: 'name _id' })
            .populate({ path: 'advertiser', select: 'email phoneNumber phoneNumber2 _id' });
    
        // הוספת _id של העיר לכל דירה בתגובה
        const response = apartments.map(apartment => ({
            ...apartment.toObject(), // המרת האובייקט לדוגמה רגילה
            cityId: searchCriteria.cityId // הוספת ה-ID של העיר לתגובה
        }));
    
        res.status(200).json(response); // מחזירים את הדירות שנמצאו עם ה-ID של העיר
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'שגיאה בעת חיפוש הדירות', error: error.message });
    }
    
};

