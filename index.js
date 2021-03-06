// Configuracion de variables de entorno
require('dotenv').config();

// Importaciones 
const { readInput, 
        inquirerMenu, 
        pause,
        listPlaces
} = require("./helpers/inquirer");

const Search = require("./models/search");


console.clear();


const main = async() => {

    const search = new Search();
    let opt;
    
    do {
        
        opt = await inquirerMenu();
        
        switch ( opt ) {
            case 1:
                // Mostrar mensaje
                const place = await readInput('Ciudad: ');
                
                // Buscar los lugares
                const places = await search.searchCity( place );
                
                // Seleccionar el lugar
                const id = await listPlaces( places );
                if( id === '0' ) continue;
                // Guardar en DB
                const placeSelect = places.find(  l => l.id === id );                
                search.addHistorial( placeSelect.name );

                // Clima
                const weatherPlace = await search.getWeather(placeSelect.lat, placeSelect.lng);
                
                // Mostrar resultados
                console.clear();
                console.log('\nInformacion de la ciudad\n'.green );
                console.log('Ciudad: ', placeSelect.name.green );
                console.log('Lat: ', placeSelect.lat );
                console.log('Lng: ', placeSelect.lng );
                console.log('Temperatura: ', weatherPlace.temp );
                console.log('Minima: ', weatherPlace.min );
                console.log('Maxima: ', weatherPlace.max );
                console.log('Descripcion: ', weatherPlace.desc.green );

                break;
            
            // Historial
            case 2:
                // search.historial.forEach( (place, index) => {
                //     const idx = `${index + 1}.`.green;
                //     console.log( `${ idx } ${ place }` );
                // });

                search.historialCaps;

                break;
        }

        if ( opt !== 0 ) await pause();

    } while ( opt !== 0 );


}


main();