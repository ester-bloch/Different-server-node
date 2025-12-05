import kelvinToCelsius from "kelvin-to-celsius"
import request from "request"

export const getWeather = (city) => {
    console.log(city[0]);
    return new Promise((resolve, reject) => {        
        request(`https://api.openweathermap.org/data/2.5/weather?q=${city},&appid=${process.env.WEATHER_API_KEY}`, (err, res, data) => {
            if (err) {
                reject(err)
            }
            if (data) {
                const weather = JSON.parse(data)
                let temp = kelvinToCelsius(weather.main.temp)
                resolve({ temp, city: weather.name })
            }
        })
    })
}