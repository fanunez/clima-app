const fs = require('fs');

const axios = require('axios');


class Search {

    historial = [];
    dbPath = './database/database.json';

    constructor() {
        this.loadDB();
        
    }

    // getter historial capitalizado
    get historialCaps() {
        this.historial.forEach( (place, index) => {
            const idx = `${index + 1}.`.green;
            const placeCaps = place.replace( /\w\S*/g, (w) => (w.replace( /^\w/, (c) => c.toUpperCase())));
            console.log( `${ idx } ${ placeCaps }` );

        });

        // return this.historial.map( place => {

        //     let words = place.split(' ');
        //     words = place.map( p => p[0].toUpperCase() + p.substring(1));

        //     return words.join(' ');
        // })

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

    // agregar al historial de busquedas
    addHistorial( place = '' ){

        if( this.historial.includes( place.toLocaleLowerCase() )) return;
        
        // solo se mantienen 6
        this.historial = this.historial.splice(0, 5);

        // agregar al inicio
        this.historial.unshift( place.toLocaleLowerCase() );

        // grabar db 
        this.saveDB();

    }   
    
    // guardar en 'base de datos'
    saveDB() {
        // carga de datos
        const payload = {
            historial: this.historial
        }

        fs.writeFileSync( this.dbPath, JSON.stringify( payload ))

    }

    // leer 'base de datos'
    loadDB() {

        if( !fs.existsSync( this.dbPath ) ) return;

        // cargar la informacion
        const info = fs.readFileSync( this.dbPath, {encoding: 'utf-8'});
        
        // parseo de datos a JSON
        const data = JSON.parse( info );

        this.historial = data.historial;
    }
    
}


module.exports = Search;