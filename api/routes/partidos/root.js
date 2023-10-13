import { query } from "../../db/index.js";
import * as matchesSchemas from '../../schemas/partidos/root.js';

export default async function(fastify, opts) {
    fastify.get('/', { schema: matchesSchemas.getAllSchema }, async function(request, reply) {
        const queryresult  = await query('SELECT * FROM "Partidos"');
        const rows = queryresult.rows;
        if (rows.length === 0)
            return reply.status(204).send({error: 'No hay entradas para la colección Partidos.'});
        return reply.send(rows);
    });

    fastify.get('/:id', { schema: matchesSchemas.getByIdSchema }, async function(request, reply) {
        const queryresult  = await query('SELECT * FROM "Partidos" WHERE "Id" = $1', [request.params.id]);
        const rows = queryresult.rows;
        if (rows.length === 0)
            return reply.status(404).send({error: 'Partido no encontrado'});
        return reply.send(rows[0]);
    });

    fastify.post('/', { schema: matchesSchemas.postSchema }, async function(request, reply) {
        const { canchaId, fechaCreacion, fechaProgramada, comunidadId } = request.body;
        const queryresult = await query('INSERT INTO "Partidos" ("CanchaId", "FechaCreacion", "FechaProgramada", "ComunidadId") VALUES ($1, $2, $3, $4) RETURNING *', [canchaId, fechaCreacion, fechaProgramada, comunidadId]);
        if(queryresult.rows.length === 0)
            return reply.status(500).send({error: 'Error al crear el partido'});
        return reply.send(queryresult.rows[0]);
    });

    fastify.put('/:id', { schema: matchesSchemas.putSchema } ,async function(request, reply) {
        const paramId = request.params.id;
        const bodyId = request.body.id;
        try {
            if (paramId != bodyId) return reply.status(409).send({ error: 'La id del cuerpo y del parámetro no coinciden.'})
            const { canchaId, fechaCreacion, fechaProgramada, comunidadId } = request.body;
            const queryresult  = await query('UPDATE "Partidos" SET "CanchaId" = $1, "FechaCreacion" = $2, "FechaProgramada" = $3, "ComunidadId" = $4 WHERE "Id" = $5 RETURNING *', [canchaId, fechaCreacion, fechaProgramada, comunidadId, paramId]);
            const rows = queryresult.rows;
            if (rows.length === 0)
                return reply.status(404).send({error: 'Partido no encontrado'});
            return reply.send(rows[0]);
        } catch (error) {
            return reply.status(500).send(error);
        }
    });

    fastify.post('/:id/jugadores', { schema: matchesSchemas.postJugadoresSchema }, async function(request, reply) {
        //honestamente no estoy seguro de si debería ser mejor pasar jugadorid en la url o en el body
        //diría que es por la url, pero bueno, recurso/id/recurso/id tampoco es muy lindo
        const { JugadorId } = request.body;
        const queryresult = await query('INSERT INTO "PartidosJugadores" ("PartidoId", "JugadorId") VALUES ($1, $2) RETURNING *', [request.params.id, JugadorId]);
        const rows = queryresult.rows;
        if (rows.length === 0) return reply.status(500).send({error: 'Error al ingresar el jugador al partido'});
        return reply.send(rows[0]);
    })

}