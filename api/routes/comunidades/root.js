import { query } from "../../db/index.js";
import * as communitySchemas from '../../schemas/comunidades/root.js';
import { getAllSchema } from '../../schemas/jugadores/root.js';

export default async function (fastify, opts) {
    // una comunidad tiene nombre
    fastify.get('/', { schema: communitySchemas.getAllSchema }, async function (request, reply) {
        const queryresult = await query('SELECT * FROM "Comunidades"');
        const rows = queryresult.rows;
        if (rows.length === 0)
            return reply.status(204).send({ error: 'No hay entradas para la colección Comunidades.' });
        return reply.send(rows);
    });

    fastify.get('/:id', { schema: communitySchemas.getByIdSchema }, async function (request, reply) {
        const queryresult = await query('SELECT * FROM "Comunidades" WHERE "Id" = $1', [request.params.id]);
        const rows = queryresult.rows;
        if (rows.length === 0)
            return reply.status(404).send({ error: 'Comunidad no encontrada' });
        return reply.send(rows[0]);
    });

    // un Usuario se puede agregar a una comunidad
    //DONE: Esto no debería ser /comunidades/idcomunidad/jugadores? También podrían tener un DELETE.
    fastify.post('/:id/jugadores', { schema: communitySchemas.inscribirJugadorSchema }, async function (request, reply) {
        const { JugadorId } = request.body;
        const queryresult = await query('INSERT INTO "ComunidadJugador" ("ComunidadId", "JugadorId") VALUES ($1, $2) RETURNING *', [request.params.id, JugadorId]);
        if (queryresult.rows.length === 0)
            return reply.status(500).send({ error: 'Error al agregar el jugador a la comunidad' });
        return reply.send(queryresult.rows[0]);
    });

    fastify.delete('/:id/jugadores/:jugadorId', { schema: communitySchemas.desinscribirJugadorSchema }, async function (request, reply) {
        const queryresult = await query('DELETE FROM "ComunidadJugador" WHERE "ComunidadId" = $1 AND "JugadorId" = $2 RETURNING *', [request.params.id, request.params.jugadorId]);
        const rows = queryresult.rows;
        if (rows.length === 0)
            return reply.status(404).send({ error: 'Comunidad no encontrada' });
        return reply.send(rows[0]);
    });

    fastify.post('/', { schema: communitySchemas.postSchema }, async function (request, reply) {
        const { nombre } = request.body;
        const queryresult = await query('INSERT INTO "Comunidades" ("Nombre") VALUES ($1) RETURNING *', [nombre]);
        if (queryresult.rows.length === 0)
            return reply.status(500).send({ error: 'Error al crear la comunidad' });
        return reply.send(queryresult.rows[0]);
    });

    fastify.put('/:id', { schema: communitySchemas.putSchema }, async function (request, reply) {
        const paramId = request.params.id;
        const bodyId = request.body.id;
        try {
            if (paramId != bodyId) return reply.status(409).send({ error: 'La id del cuerpo y del parámetro no coinciden.' })
            const { nombre } = request.body;
            const queryresult = await query('UPDATE "Comunidades" SET "Nombre" = $1 WHERE "Id" = $2 RETURNING *', [nombre, paramId]);
            const rows = queryresult.rows;
            if (rows.length === 0)
                return reply.status(404).send({ error: 'Comunidad no encontrada' });
            return reply.send(rows[0]);
        } catch (error) {
            return reply.status(500).send(error);
        }
    });

    // obtener todos los usuarios de la tabla Usuarios cuando su id esté en la tabla de ComunidadesUsuarios
    // TODO TESTEAR ESTO
    //DONE: Las comunidades son de usuarios? O de Jugadores? El diagrama dice jugadores.
    fastify.get('/:id/jugadores', { schema: getAllSchema }, async function (request, reply) {
        const queryresult = await query('SELECT * FROM "Jugadores" WHERE "Id" IN (SELECT "JugadorId" FROM "ComunidadJugador" WHERE "ComunidadId" = $1)', [request.params.id]);
        const rows = queryresult.rows;
        if (rows.length === 0)
            return reply.status(404).send({ error: 'Comunidad no encontrada' });
        return reply.send(rows);
    });

    //FIXME: Tampoco veo posibilidad de borrar una comunidad. Quien crea las comunidades? Cualqueir jugador? El último la elimina? Si queda vacía se elimina sola?
    
}