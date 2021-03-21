
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


    async searchCity( place = '' ) {

        try {
            // peticion HTTP
            const instance = axios.create({
                baseURL: `https://api.mapbox.com/geocoding/v5/mapbox.places/${ place }.json`,
                params: this.paramsMapbox
            });

            const answer = await instance.get();
            console.log(answer.data);
                        
            return []; // retorna lugares que coincidan con ese lugar
            
        } catch (error) {
            return [];
        }
    }
}


module.exports = Search;