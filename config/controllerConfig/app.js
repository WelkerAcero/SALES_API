const { CREAR_CONTROLADOR } = require('./createControllerProcess.js');
console.clear();
console.log(process.argv); // Datos enviados por consola
const argv = require('yargs')
    .options('c',
        {
            alias: 'controller',
            type: 'string',
            demandOption: true,
        })
    .check((argv, options) => {
        console.log('String recibido', "'"+process.env.npm_config_controller+"'", 'Tipo = ', typeof(process.env.npm_config_controller))
        if (process.env.npm_config_controller != '') return true;
            
        throw 'El controlador debe tener un nombre'
        
    }).argv;

CREAR_CONTROLADOR(process.env.npm_config_controller)
    .then(archiveName => console.log(`${archiveName} Controller creado exitosamente`))
    .catch((err) => console.log(err));