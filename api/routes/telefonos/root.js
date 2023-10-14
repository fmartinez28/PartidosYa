import { query } from "../../db/index.js";
import * as phonesSchemas from '../../schemas/telefonos/root.js';

export default async function (fastify, opts) {
    // un telefono tiene codpais, codArea, numero
    fastify.get('/', { schema: phonesSchemas.getAllSchema }, async function (request, reply) {
        const queryresult = await query('SELECT * FROM "telefonos"');
        const rows = queryresult.rows;
        if (rows.length === 0)
            return reply.status(204).send({ message: 'No hay entradas para la colección telefonos.' });
        return reply.send(rows);
    });

    fastify.get('/:id', { schema: phonesSchemas.getByIdSchema }, async function (request, reply) {
        const queryresult = await query('SELECT * FROM "telefonos" WHERE "id" = $1', [request.params.id]);
        const rows = queryresult.rows;
        if (rows.length === 0)
            return reply.status(404).send({ message: 'Telefono no encontrado' });
        return reply.send(rows[0]);
    });

    fastify.post('/', { schema: phonesSchemas.postSchema }, async function (request, reply) {
        const { codpais, codarea, numero } = request.body;
        const queryresult = await query('INSERT INTO "telefonos" ("codpais", "codarea", "numero") VALUES ($1, $2, $3) RETURNING *', [codpais, codarea, numero]);
        if (queryresult.rows.length === 0)
            return reply.status(500).send({ message: 'Error al crear el telefono' });
        return reply.send(queryresult.rows[0]);
    });

    fastify.put('/:id', { schema: phonesSchemas.putSchema }, async function (request, reply) {
        const paramid = request.params.id;
        const bodyId = request.body.id;
        try {
            if (paramid != bodyId) return reply.status(409).send({ message: 'La id del cuerpo y del parámetro no coinciden.' })
            const { codpais, codarea, numero } = request.body;
            const queryresult = await query('UPDATE "telefonos" SET "codpais" = $1, "codarea" = $2, "numero" = $3 WHERE "id" = $4 RETURNING *', [codpais, codarea, numero, paramid]);
            const rows = queryresult.rows;
            if (rows.length === 0)
                return reply.status(404).send({ message: 'Telefono no encontrado' });
            return reply.send(rows[0]);
        } catch (error) {
            return reply.status(500).send({ message: error });
        }
    });

    fastify.delete('/:id', { schema: phonesSchemas.deleteSchema }, async function (request, reply) {
        const id = request.params.id;
        try {
            const queryresult = await query('DELETE FROM "telefonos" WHERE "id" = $1 RETURNING *', [id]);
            if (queryresult.rows.length === 0)
                return reply.status(404).send({ message: 'Telefono no encontrado' });
            return reply.status(200).send({ message: "El telefono fue eliminado" });
        } catch (error) {
            return reply.status(500).send({ message: error });
        }
    });
}