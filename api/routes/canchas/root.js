import { query } from "../../db/index.js";
import * as courtSchemas from '../../schemas/canchas/root.js';

export default async function (fastify, opts) {
    // una cancha tiene id, nombre, DireccionID, canchanum y propietarioid
    fastify.get('/', { schema: courtSchemas.getAllSchema }, async function (request, reply) {
        const queryresult = await query('SELECT * FROM "canchas"');
        const rows = queryresult.rows;
        if (rows.length === 0)
            return reply.status(204).send({ error: 'No hay entradas para la colección canchas.' });
        return reply.send(rows);
    });

    fastify.get('/:id', { schema: courtSchemas.getByIdSchema }, async function (request, reply) {
        const queryresult = await query('SELECT * FROM "canchas" WHERE "id" = $1', [request.params.id]);
        const rows = queryresult.rows;
        if (rows.length === 0)
            return reply.status(404).send({ error: 'Cancha no encontrada' });
        return reply.send(rows[0]);
    });

    fastify.post('/', { schema: courtSchemas.postSchema }, async function (request, reply) {
        const { nombre, direccionid, canchanum, propietarioid } = request.body;
        const queryresult = await query('INSERT INTO "canchas" ("nombre", "direccionid", "canchanum", "propietarioid") VALUES ($1, $2, $3, $4) RETURNING *', [nombre, direccionid, canchanum, propietarioid]);
        if (queryresult.rows.length === 0)
            return reply.status(500).send({ error: 'Error al crear la cancha' });
        return reply.send(queryresult.rows[0]);
    });

    fastify.put('/:id', { schema: courtSchemas.putSchema }, async function (request, reply) {
        const paramId = request.params.id;
        const bodyId = request.body.id;
        try {
            if (paramId != bodyId) return reply.status(409).send({ error: 'La id del cuerpo y del parámetro no coinciden.' })
            const { nombre, direccionid, canchanum, propietarioid } = request.body;
            const queryresult = await query('UPDATE "canchas" SET "nombre" = $1, "direccionid" = $2, "canchanum" = $3, "propietarioid" = $4 WHERE "id" = $5 RETURNING *', [nombre, direccionid, canchanum, propietarioid, paramId]);
            const rows = queryresult.rows;
            if (rows.length === 0)
                return reply.status(404).send({ error: 'Cancha no encontrada' });
            return reply.send(rows[0]);
        } catch (error) {
            return reply.status(500).send(error);
        }
    });

    //DONE: Falta baja (al menos lógica.). El usuario siempre se puede equivocar.
    fastify.delete('/:id', { schema: courtSchemas.deleteSchema }, async function (request, reply) {
        const queryresult = await query('DELETE FROM "canchas" WHERE "id" = $1 RETURNING *', [request.params.id]);
        const rows = queryresult.rows;
        if (rows.length === 0)
            return reply.status(404).send({ error: 'Cancha no encontrada' });
        return reply.send(rows[0]);
    });

}