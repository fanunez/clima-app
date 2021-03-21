
const axios = require('axios');

class Search {

    historial = ['Santiago', 'Londres', 'Tokio'];

    constructor() {
        //TODO: leer bd, si existe
        
    }

    // getter de parametros
    get paramsMapbox() {
        return {
            'access_token': process.env.MAPBOX_KEY,
            'limit': 5,
            'language': 'es'
        }
    }

    get paramsWeather() {
        return{
            'appid': process.env.OPENWEATHER_KEY,
            'units': 'metric',
            'lang': 'es'
        }
    }


    async searchCity( place = '' ) {

        try {
            // peticion HTTP
            const instance = axios.create({
                baseURL: `https://api.mapbox.com/geocoding/v5/mapbox.places/${ place }.json`,
                params: this.paramsMapbox
            });

            const answer = await instance.get();
            // retornar objeto de forma implicita ( llave )
            return answer.data.features.map( place => ({
                id: place.id,
                name: place.place_name,
                lng: place.center[0],
                lat: place.center[1]
            }));
                                    
        } catch (error) {
            return [];
        }
    }

    async getWeather( lat, lon ) {

        try {
            // peticion HTTP
            const instance = axios.create({
                baseURL: `https://api.openweathermap.org/data/2.5/weather`,
                params: { ...this.paramsWeather, lat, lon } 
            });

            const answer = await instance.get();
            const { main, weather } = answer.data;
            
            return{
                desc: weather[0].description,
                min: main.temp_min,
                max: main.temp_max,
                temp: main.temp
            };
            
            // return {
            //     desc: answer.data.weather[0].description,
            //     min: answer.data.main.temp_min,
            //     max: answer.data.main.temp_max,
            //     temp: answer.data.main.temp
            // };

        } catch (error) {
            return [];
        }

    }

    
}


module.exports = Search;