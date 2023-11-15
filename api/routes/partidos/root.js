import { query } from "../../db/index.js";
import * as matchesSchemas from '../../schemas/partidos/root.js';
import { paginateQuery } from '../../utils/pagination.js';

export default async function (fastify, opts) {
    fastify.get('/', { schema: matchesSchemas.getAllSchema }, async function (request, reply) {
        let queryString = 'SELECT * FROM "partido" ';
        if (request.query.city && request.query.country){
            //No es muy lindo esto...
            queryString += `WHERE canchaid IN 
            (SELECT id FROM canchas WHERE direccionid IN 
            (SELECT id FROM direcciones
            WHERE pais ILIKE '${request.query.country}' AND ciudad ILIKE '${request.query.city}'))`
        }
        queryString = (request.query.page || request.query.limit) ?
        paginateQuery(queryString, request.query.page, request.query.limit) : queryString;

        console.log(queryString);
        const queryresult = await query(queryString);
        const rows = queryresult.rows;
        if (rows.length === 0)
            return reply.status(204).send();
        return reply.send(rows);
    });

    fastify.get('/:id', { schema: matchesSchemas.getByIdSchema }, async function (request, reply) {
        const queryresult = await query('SELECT * FROM "partido" WHERE "id" = $1', [request.params.id]);
        const rows = queryresult.rows;
        if (rows.length === 0)
            return reply.status(404).send({ error: 'Partido no encontrado' });
        return reply.send(rows[0]);
    });

    fastify.post('/', { schema: matchesSchemas.postSchema }, async function (request, reply) {
        const { canchaid, fechacreacion, fechaprogramada, comunidadid } = request.body;
        const queryresult = await query('INSERT INTO "partido" ("canchaid", "fechacreacion", "fechaprogramada", "comunidadid") VALUES ($1, $2, $3, $4) RETURNING *', [canchaid, fechacreacion, fechaprogramada, comunidadid]);
        if (queryresult.rows.length === 0)
            return reply.status(500).send({ error: 'Error al crear el partido' });
        return reply.status(201).send(queryresult.rows[0]);
    });

    fastify.put('/:id', { schema: matchesSchemas.putSchema }, async function (request, reply) {
        const paramid = request.params.id;
        const bodyId = request.body.id;
        try {
            if (paramid != bodyId) return reply.status(409).send({ error: 'La id del cuerpo y del parámetro no coinciden.' })
            const { canchaid, fechacreacion, fechaprogramada, comunidadid } = request.body;
            const queryresult = await query('UPDATE "partido" SET "canchaid" = $1, "fechacreacion" = $2, "fechaprogramada" = $3, "comunidadid" = $4 WHERE "id" = $5 RETURNING *', [canchaid, fechacreacion, fechaprogramada, comunidadid, paramid]);
            const rows = queryresult.rows;
            if (rows.length === 0)
                return reply.status(404).send({ error: 'Partido no encontrado' });
            return reply.status(200).send(rows[0]);
        } catch (error) {
            return reply.status(500).send(error);
        }
    });

    fastify.post('/:id/jugadores', { schema: matchesSchemas.postJugadoresSchema }, async function (request, reply) {
        //honestamente no estoy seguro de si debería ser mejor pasar jugadorid en la url o en el body
        //diría que es por la url, pero bueno, recurso/id/recurso/id tampoco es muy lindo
        const { jugadorid } = request.body;
        const queryresult = await query('INSERT INTO "participacionpartido" ("partidoid", "jugadorid") VALUES ($1, $2) RETURNING *', [request.params.id, jugadorid]);
        const rows = queryresult.rows;
        if (rows.length === 0) return reply.status(500).send({ error: 'Error al ingresar el jugador al partido' });
        return reply.status(201).send(rows[0]);
    })
}