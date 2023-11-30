import swagger from '@fastify/swagger';
import fp from 'fastify-plugin';

export default fp(async function (fastify, opts) {
  await fastify.register(swagger, {
    swagger: {
      info: {
        title: 'SMatcher - Swagger',
        description: 'Documentación de la API de SMatcher',
        version: '0.1.0'
      },
      host: `${process.env.FASTIFY_HOST}:${process.env.FASTIFY_PORT}`,
      schemes: [`${process.env.FASTIFY_PROTOCOL}`],
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