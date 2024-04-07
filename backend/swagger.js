const swaggerAutogen = require( 'swagger-autogen');

const outputFile = './swagger-output.json';
const endpointsFiles = [
    './src/routes/Router.ts'
];

const doc = {
    info: {
        title: 'Shop backend API',
        description: 'API of Clothes Shop by Kriz',
        version: '2.0.0',
    },
    host: '',
    basePath: '/api/v1',
    schemes: [],
};

swaggerAutogen(outputFile, endpointsFiles, doc)
    .catch(error => {
        console.error('Erro when auto generate Swagger: ', error.message);
    });