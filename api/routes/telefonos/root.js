import { query } from "../../db/index.js";
import * as phonesSchemas from '../../schemas/telefonos/root.js';

export default async function (fastify, opts) {
    // un telefono tiene CodPais, codArea, Numero
    fastify.get('/', { schema: phonesSchemas.getAllSchema }, async function (request, reply) {
        const queryresult = await query('SELECT * FROM "Telefonos"');
        const rows = queryresult.rows;
        if (rows.length === 0)
            return reply.status(204).send({ error: 'No hay entradas para la colección Telefonos.' });
        return reply.send(rows);
    });

    fastify.get('/:id', { schema: phonesSchemas.getByIdSchema }, async function (request, reply) {
        const queryresult = await query('SELECT * FROM "Telefonos" WHERE "Id" = $1', [request.params.id]);
        const rows = queryresult.rows;
        if (rows.length === 0)
            return reply.status(404).send({ error: 'Telefono no encontrado' });
        return reply.send(rows[0]);
    });

    fastify.post('/', { schema: phonesSchemas.postSchema }, async function (request, reply) {
        const { CodPais, CodArea, Numero } = request.body;
        const queryresult = await query('INSERT INTO "Telefonos" ("CodPais", "CodArea", "Numero") VALUES ($1, $2, $3) RETURNING *', [CodPais, CodArea, Numero]);
        if (queryresult.rows.length === 0)
            return reply.status(500).send({ error: 'Error al crear el telefono' });
        return reply.send(queryresult.rows[0]);
    });

    fastify.put('/:id', { schema: phonesSchemas.putSchema }, async function (request, reply) {
        const paramId = request.params.id;
        const bodyId = request.body.id;
        try {
            if (paramId != bodyId) return reply.status(409).send({ error: 'La id del cuerpo y del parámetro no coinciden.' })
            const { CodPais, CodArea, Numero } = request.body;
            const queryresult = await query('UPDATE "Telefonos" SET "CodPais" = $1, "CodArea" = $2, "Numero" = $3 WHERE "Id" = $4 RETURNING *', [CodPais, CodArea, Numero, paramId]);
            const rows = queryresult.rows;
            if (rows.length === 0)
                return reply.status(404).send({ error: 'Telefono no encontrado' });
            return reply.send(rows[0]);
        } catch (error) {
            return reply.status(500).send(error);
        }
    });
}