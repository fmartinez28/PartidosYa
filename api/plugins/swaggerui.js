import swaggerui from '@fastify/swagger-ui';
import fp from 'fastify-plugin';


export default fp(async function (fastify, opts) {
  await fastify.register(swaggerui, {
    routePrefix: '/docs',
    uiConfig: {
      docExpansion: 'full',
      deepLinking: false
    },
    uiHooks: {
      onRequest: function (request, reply, next) { next() },
      preHandler: function (request, reply, next) { next() }
    },
    staticCSP: false,
  })
});