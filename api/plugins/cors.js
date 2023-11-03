import fp from 'fastify-plugin';
import cors from '@fastify/cors';

export default fp(function (fastify, opts, done) {
    fastify.register(cors, {
        origin: '*',
        methods: ['GET', 'POST', 'PUT', 'DELETE'],
        credentials: true
    });
    done();
})