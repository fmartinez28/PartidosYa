import { query } from "../../../db/index.js";

export default async function(fastify, opts) {
    // una comunidad tiene nombre
    fastify.get('/', async function(request, reply) {
        const queryresult  = await query('SELECT * FROM "Comunidades"');
        const rows = queryresult.rows;
        if (rows.length === 0)
            return reply.status(204).send({error: 'No hay entradas para la colección Comunidades.'});
        return reply.send(rows);
    });

    fastify.get('/:id', async function(request, reply) {
        const queryresult  = await query('SELECT * FROM "Comunidades" WHERE "Id" = $1', [request.params.id]);
        const rows = queryresult.rows;
        if (rows.length === 0)
            return reply.status(404).send({error: 'Comunidad no encontrada'});
        return reply.send(rows[0]);
    });

    fastify.post('/', async function(request, reply) {
        const { nombre } = request.body;
        const queryresult = await query('INSERT INTO "Comunidades" ("Nombre") VALUES ($1) RETURNING *', [nombre]);
        if(queryresult.rows.length === 0)
            return reply.status(500).send({error: 'Error al crear la comunidad'});
        return reply.send(queryresult.rows[0]);
    });

    fastify.put('/:id', async function(request, reply) {
        const paramId = request.params.id;
        const bodyId = request.body.id;
        try {
            if (paramId != bodyId) return reply.status(409).send({ error: 'La id del cuerpo y del parámetro no coinciden.'})
            const { nombre } = request.body;
            const queryresult  = await query('UPDATE "Comunidades" SET "Nombre" = $1 WHERE "Id" = $2 RETURNING *', [nombre, paramId]);
            const rows = queryresult.rows;
            if (rows.length === 0)
                return reply.status(404).send({error: 'Comunidad no encontrada'});
            return reply.send(rows[0]);
        } catch (error) {
            return reply.status(500).send(error);
        }
    });
    
}