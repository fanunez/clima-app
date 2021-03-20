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
                value: '1',
                name: `${ '1.'.green } Crear tarea`
            },
            {
                value: '2',
                name: `${ '2.'.green } Listar tareas`
            },
            {
                value: '3',
                name: `${ '3.'.green } Listar tareas completadas`
            },
            {
                value: '4',
                name: `${ '4.'.green } Listar tareas pendientes`
            },
            {
                value: '5',
                name: `${ '5.'.green } Completar tarea(s)`
            },
            {
                value: '6',
                name: `${ '6.'.green } Borrar tarea`
            },
            {
                value: '0',
                name: `${ '0.'.green } Salir`
            }
        ]
    }
];


const inquirerMenu = async() => {

    console.clear();
    console.log('========================='.green);
    console.log('  Seleccione una opcion  '.white);
    console.log('=========================\n'.green);

    const { option } = await inquirer.prompt( menuOpts )

    return option;
}


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


const listTaskDelete = async( tasks = [] ) => {

    // Metodo map transforma los arreglos 'hijos' al tipo que se pida
    const choices = tasks.map( (task, index) => {
        const idx = `${ index + 1 }.`.green;
        return {
            value: task.id,
            name: `${ idx } ${ task.desc }`
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
            message: 'Borrar',
            choices
        }
    ];

    const { id } = await inquirer.prompt( questions );
    return id;

}

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
    listTaskDelete,
    confirm,
    showCheckList
}



