


const { readInput, 
        inquirerMenu, 
        pause 
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
                await search.searchCity( place );

                // Buscar los lugares

                // Seleccionar el lugar

                // Clima

                // Mostrar resultados
                console.log('\nInformacion de la ciudad\n'.green);
                console.log('Ciudad: ', );
                console.log('Lat: ', );
                console.log('Lng: ', );
                console.log('Temperatura: ', );
                console.log('Minima: ', );
                console.log('Maxima: ', );

                break;
            
            case 2:
                console.log('Opcion Historial');
                break;
        }

        if ( opt !== 0 ) await pause();

    } while ( opt !== 0 );


}


main();