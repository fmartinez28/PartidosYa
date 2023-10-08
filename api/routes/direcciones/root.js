import { query } from "../../db/index.js";
import * as addressSchemas from '../../schemas/direcciones/root.js';

export default async function (fastify, opts) {

    //FIXME: Ojo que no se estén complicando con la dirección. Deberían usar una campo coordenada del tipo Geometry POINT. 
    fastify.get('/', { schema: addressSchemas.getAllSchema }, async function (request, reply) {
        const queryresult = await query('SELECT * FROM "Direcciones"');
        const rows = queryresult.rows;
        if (rows.length === 0)
            return reply.status(204).send({ error: 'No hay entradas para la colección Direcciones.' });
        return reply.send(rows);
    });

    fastify.get('/:id', { schema: addressSchemas.getByIdSchema }, async function (request, reply) {
        const queryresult = await query('SELECT * FROM "Direcciones" WHERE "Id" = $1', [request.params.id]);
        const rows = queryresult.rows;
        if (rows.length === 0)
            return reply.status(404).send({ error: 'Direccion no encontrada' });
        return reply.send(rows[0]);
    });

    fastify.post('/', { schema: addressSchemas.postSchema }, async function (request, reply) {
        const { Pais, Estado, Ciudad, Calle, Numero } = request.body;
        const queryresult = await query('INSERT INTO "Direcciones" ("Pais", "Estado", "Ciudad", "Calle", "Numero") VALUES ($1, $2, $3, $4, $5) RETURNING *', [Pais, Estado, Ciudad, Calle, Numero]);
        if (queryresult.rows.length === 0)
            return reply.status(500).send({ error: 'Error al crear la direccion' });
        return reply.send(queryresult.rows[0]);
    });

    fastify.put('/:id', { schema: addressSchemas.putSchema }, async function (request, reply) {
        const paramId = request.params.id;
        const bodyId = request.body.id;
        try {
            if (paramId != bodyId) return reply.status(409).send({ error: 'La id del cuerpo y del parámetro no coinciden.' })
            const { Pais, Estado, Ciudad, Calle, Numero } = request.body;
            const queryresult = await query('UPDATE "Direcciones" SET "Pais" = $1, "Estado" = $2, "Ciudad" = $3, "Calle" = $4, "Numero" = $5 WHERE "Id" = $5 RETURNING *', [Pais, Estado, Ciudad, Calle, Numero, paramId]);
            const rows = queryresult.rows;
            if (rows.length === 0)
                return reply.status(404).send({ error: 'Direccion no encontrada' });
            return reply.send(rows[0]);
        } catch (error) {
            return reply.status(500).send(error);
        }
    });
}