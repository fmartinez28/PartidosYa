import * as signupSchemas from '../../schemas/inscribir/root.js';

export default async function (fastify, opts) {
    // un post que recibe una id de un jugador y una id de un partido, para agregarlos a la tabla ParticipacionPartido
    fastify.post('/', { schema: signupSchemas.inscribirseSchema }, async function (request, reply) {
        const { idJugador, idPartido } = request.body;
        const queryresult = await query('INSERT INTO "ParticipacionPartido" ("IdJugador", "IdPartido") VALUES ($1, $2) RETURNING *', [idJugador, idPartido]);
        if (queryresult.rows.length === 0)
            return reply.status(500).send({ error: 'Error al inscribir al jugador al partido' });
        return reply.send(queryresult.rows[0]);
    });
}