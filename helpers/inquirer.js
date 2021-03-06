const inquirer = require('inquirer');
require('colors');


const menuOpts = [
    {
        type: 'list',
        name: 'option',
        message: 'Que desea hacer?',
        // similares a los selectores html
        choices: [
            {
                value: 1,
                name: `${ '1.'.green } Buscar ciudad`
            },
            {
                value: 2,
                name: `${ '2.'.green } Historial`
            },
            {
                value: 0,
                name: `${ '0.'.green } Salir`
            }
        ]
    }
];

// Menu de despliege de opciones
const inquirerMenu = async() => {

    console.clear();
    console.log('========================='.green);
    console.log('  Seleccione una opcion  '.white);
    console.log('=========================\n'.green);

    const { option } = await inquirer.prompt( menuOpts )

    return option;
}

// Pausa asincrona para mantener mensajes en pantalla
const pause = async() => {

    const question = [
        {
            type: 'input',
            name: 'enter',
            message: `Presione ${ 'ENTER'.green } para continuar`
        }
    ]
    console.log('\n');
    await inquirer.prompt( question );


}

// Lectura de input por consola
const readInput = async( msg ) => {

    const question = [
        {
            type: 'input',
            name: 'desc',
            message: msg,
            validate( value ) {
                if( value.length === 0 ) {
                    return 'Por favor, ingrese un valor';
                }
                return true;
            }
        }
    ];

    const { desc } = await inquirer.prompt(question);
    return desc;

}

// Listar tareas que pueden ser eliminadas
const listPlaces = async( places = [] ) => {

    // Metodo map transforma los arreglos 'hijos' al tipo que se pida
    const choices = places.map( (place, index) => {
        const idx = `${ index + 1 }.`.green;
        return {
            value: place.id,
            name: `${ idx } ${ place.name }`
        }
    });

    // anadir al principio
    choices.unshift({
        value: '0',
        name: '0.'.green + ' Cancelar'
    });

    const questions = [
        {
            type: 'list',
            name: 'id',
            message: 'Seleccione lugar: ',
            choices
        }
    ];

    const { id } = await inquirer.prompt( questions );
    return id;

}

// Mensaje de confirmacion
const confirm = async( msg ) => {

    const question = [
        {
            type: 'confirm', // revisar documentacion de inquirer
            name: 'ok',
            message: msg 
        }
    ];

    const { ok } = await inquirer.prompt( question );
    return ok;
}

// Lista tipo check
const showCheckList = async( tasks = [] ) => {

    // Metodo map transforma los arreglos 'hijos' al tipo que se pida
    const choices = tasks.map( (task, index) => {
        const idx = `${ index + 1 }.`.green;
        return {
            value: task.id,
            name: `${ idx } ${ task.desc }`,
            checked: ( task.completeAt ) ? true : false
        }
    });

    const question = [
        {
            type: 'checkbox',
            name: 'ids',
            message: 'Seleccione',
            choices
        }
    ];

    const { ids } = await inquirer.prompt( question );
    return ids;

}


module.exports = {
    inquirerMenu,
    pause,
    readInput,
    listPlaces,
    confirm,
    showCheckList
}



