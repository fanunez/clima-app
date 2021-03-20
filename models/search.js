
const axios = require('axios');

class Search {

    historial = ['Santiago', 'Londres', 'Tokio'];

    constructor() {
        //TODO: leer bd, si existe
        
    }

    async searchCity( place = '' ) {

        try {
            // peticion HTTP
            // console.log( 'ciudad: ', place );
            const answer = await axios.get('https://api.mapbox.com/geocoding/v5/mapbox.places/9%20rue%20Alphonse%20Penaud%20Paris,%2075020%20France.json?limit=5&access_token=pk.eyJ1IjoicGFuY2h1d3UiLCJhIjoiY2ttaTdxamtnMGVxZTJvczJyZnFyNjU4dCJ9.nWcZ1ZFRLffMSorAW0YHkA');
            console.log(answer.data);
            
            return []; // retorna lugares que coincidan con ese lugar
            
        } catch (error) {
            return [];
        }
    }
}


module.exports = Search;