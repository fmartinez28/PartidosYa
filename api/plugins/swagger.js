import swagger from '@fastify/swagger';
import fp from 'fastify-plugin';

//por el momento no
//const url = `http://${process.env.FASTIFY_HOST}:${process.env.FASTIFY_PORT}`
//tirale npm run dev para ver swagger
//seh

// me sorprenderia que corra
// yea
    export default fp(async function (fastify, opts) {
    await fastify.register(swagger, {
        swagger: {
          info: {
            title: 'PartidosYa - Swagger',
            description: 'Documentación de la API de PartidosYa',
            version: '0.1.0'
          },
          host: 'localhost',
          schemes: ['http'],
          consumes: ['application/json'],
          produces: ['application/json'],
          securityDefinitions: {
            apiKey: {
              type: 'apiKey',
              name: 'apiKey',
              in: 'header'
            }
          },
          hideUntagged: true,
          exposeRoute: true,
        }
      })
});