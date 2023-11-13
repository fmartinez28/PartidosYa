import fp from 'fastify-plugin';
import jwt from '@fastify/jwt';

export default fp(function (fastify, opts, done) {
    fastify.register(jwt, {
        secret: process.env.JWT_SECRET
    });
    //Agrego la funcionalidad de auth a la instancia de fastify, utilizarlo en los onRequest con [fastify.auth]
    fastify.decorate("auth", async (request, reply) => {
        try {
            await request.jwtVerify();
        } catch (err) {
            reply.status(401).send({ error: "No autorizado, inicie sesión de no haberlo hecho." });
        }
    });
    done();
})