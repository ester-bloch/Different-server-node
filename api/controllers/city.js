import City from '../models/city.js'
import dotenv from 'dotenv';
import axios from 'axios';
import { translate } from '@vitalets/google-translate-api';
dotenv.config();

export const getAll = (req, res) => {
    City.find()
        .populate('apartments', ' name')
        // const posts = await Posts.find().populate('authors', 'name'); 
        //.populate({ path:}}
        .then((data) => {
            res.status(200).send(data)
        })
        .catch(err => {
            res.status(500).send({ error: err.message })
        })
}

export const create = (req, res) => {
    const { name } = req.body
    const newCity = new City({ name, apartments: [] })
    newCity.save()
        .then(async (data) => {
            res.status(200).send(data)
        })
        .catch(err => {
            res.status(500).send({ error: err.message })
        })

}

export const getById = (req, res) => {
    Dish.findById(req.params.id)
        .populate({ path: 'category', select: '-_id description' })
        .then(data => {
            if (!data) return res.status(404).send({ error: 'Dish not found' })
            res.status(200).send(data)
        })
        .catch(err => {
            res.status(500).send({ error: err.message })
        })
}


export const update = (req, res) => {

    const { id } = req.params

    City.findByIdAndUpdate(id, req.body, { new: true })
        .then(c => {
            res.status(200).send({ message: `update category ${c._id} succeed!`, c })
        })
        .catch(error => {
            res.status(500).send({ error: error.message })
        })
}
export const getWeather = async (req, res) => {
    const city = req.params.city; // הנחה שהעיר נשלחת כפרמטר ב-URL
    const encodedCity = encodeURIComponent(city); // קידוד שם העיר
    //const translated = await translate(city, { to: 'en' });
    //const cityNameInEnglish = translated.text;
    const apiKey = process.env.WEATHER_API;// הכנס כאן את המפתח שלך
    const url = `http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
    axios.get(url).then(async (response) => {
        const weatherData = response.data;
        console.log(weatherData);
        res.json({
            "descriptionEnglish": weatherData.weather[0].description,
            "descriptionHebrew": (await translate(weatherData.weather[0].description, { to: 'he' })).text,
            "temperature": weatherData.main.temp,
        });
    }).catch((error) => {
        res.status(500).json({ error: 'שגיאה בקבלת מזג האוויר' });
    })

}
// export const update2 = (req, res) => {
//     const { id } = req.params
//     Dish.findByIdAndUpdate(id, req.body,).
//         then(async data => {
//             const { category } = req.body
//             if (category) {
//                 Category.findByIdAndUpdate(category, { $push: { data: data._id } })
//                 await Category.findByIdAndUpdate(data.category, { $pull: { data: data._id } })
//                 await res.status(200).send({ message: `update dish ${data._id} succeeded` })
//             }
//         })
//         .catch(err => {
//             res.status(500).send({ error: err.message })
//         })
// }
