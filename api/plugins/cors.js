import fp from 'fastify-plugin';
import cors from '@fastify/cors';

export default fp(function (fastify, opts, done) {
    fastify.register(cors, {
        origin: [
            'http://localhost:4200',
            'https://localhost:4200',
            'http://localhost',
            'https://localhost'
        ],
        methods: ['GET', 'POST', 'PUT', 'DELETE'],
        credentials: true
    });
    done();
})