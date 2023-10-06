import { query } from "../../../db/index.js";

export default async function(fastify, opts) {
    // una cancha tiene Id, Nombre, DireccionID, CanchaNum y PropietarioId
    fastify.get('/', async function(request, reply) {
        const queryresult  = await query('SELECT * FROM "Canchas"');
        const rows = queryresult.rows;
        if (rows.length === 0)
            return reply.status(204).send({error: 'No hay entradas para la colección Canchas.'});
        return reply.send(rows);
    });

    fastify.get('/:id', async function(request, reply) {
        const queryresult  = await query('SELECT * FROM "Canchas" WHERE "Id" = $1', [request.params.id]);
        const rows = queryresult.rows;
        if (rows.length === 0)
            return reply.status(404).send({error: 'Cancha no encontrada'});
        return reply.send(rows[0]);
    });

    fastify.post('/', async function(request, reply) {
        const { nombre, direccionId, canchaNum, propietarioId } = request.body;
        const queryresult = await query('INSERT INTO "Canchas" ("Nombre", "DireccionId", "CanchaNum", "PropietarioId") VALUES ($1, $2, $3, $4) RETURNING *', [nombre, direccionId, canchaNum, propietarioId]);
        if(queryresult.rows.length === 0)
            return reply.status(500).send({error: 'Error al crear la cancha'});
        return reply.send(queryresult.rows[0]);
    });

    fastify.put('/:id', async function(request, reply) {
        const paramId = request.params.id;
        const bodyId = request.body.id;
        try {
            if (paramId != bodyId) return reply.status(409).send({ error: 'La id del cuerpo y del parámetro no coinciden.'})
            const { nombre, direccionId, canchaNum, propietarioId } = request.body;
            const queryresult  = await query('UPDATE "Canchas" SET "Nombre" = $1, "DireccionId" = $2, "CanchaNum" = $3, "PropietarioId" = $4 WHERE "Id" = $5 RETURNING *', [nombre, direccionId, canchaNum, propietarioId, paramId]);
            const rows = queryresult.rows;
            if (rows.length === 0)
                return reply.status(404).send({error: 'Cancha no encontrada'});
            return reply.send(rows[0]);
        } catch (error) {
            return reply.status(500).send(error);
        }
    });

}