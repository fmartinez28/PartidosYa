import { query } from "../../db/index.js";
import * as communitySchemas from '../../schemas/comunidades/root.js';
import { getAllSchema } from '../../schemas/jugadores/root.js';
import { paginateQuery } from "../../utils/pagination.js";

export default async function (fastify, opts) {
    // una comunidad tiene nombre
    fastify.get('/', { schema: communitySchemas.getAllSchema }, async function (request, reply) {
        const queryParams = request.query;
        console.log(queryParams);

        let queryString = 'SELECT * FROM "comunidades" ';
        if (queryParams.search) queryString += `WHERE "nombre" ILIKE '%${queryParams.search}%'`;
        queryString = paginateQuery(queryString, queryParams.page, queryParams.limit);

        const queryResult = await query(queryString);
        const rows = queryResult.rows;
        if (rows.length === 0)
            return reply.status(204).send();
        return reply.send(rows);
    });

    fastify.get('/:id', {
        schema: communitySchemas.getByIdSchema,
        onRequest: [
            fastify.auth
        ]
    }, async function (request, reply) {
        const queryresult = await query('SELECT * FROM "comunidades" WHERE "id" = $1', [request.params.id]);
        const rows = queryresult.rows;
        if (rows.length === 0)
            return reply.status(404).send({ message: 'Comunidad no encontrada' });
        return reply.send(rows[0]);
    });

    // un Usuario se puede agregar a una comunidad
    //DONE: Esto no debería ser /comunidades/idcomunidad/jugadores? También podrían tener un DELETE.
    fastify.post('/:id/jugadores', {
        schema: communitySchemas.inscribirJugadorSchema,
        onRequest: [
            fastify.auth
        ]
    }, async function (request, reply) {
        const { jugadorid, fecharegistro } = request.body;
        if (request.user.rolid != 1) return reply.status(401).send({ message: 'No autorizado, debe ser un jugador para crear una comunidad.' });
        const queryresult = await query('INSERT INTO "comunidadjugador" ("comunidadid", "jugadorid", "fecharegistro") VALUES ($1, $2, $3) RETURNING *', [request.params.id, jugadorid, fecharegistro]);
        if (queryresult.rows.length === 0)
            return reply.status(500).send({ message: 'Error al agregar el jugador a la comunidad' });
        return reply.status(201).send(queryresult.rows[0]);
    });

    fastify.delete('/:id/jugadores/:jugadorId', { schema: communitySchemas.desinscribirJugadorSchema }, async function (request, reply) {
        const queryresult = await query('DELETE FROM "comunidadjugador" WHERE "comunidadid" = $1 AND "jugadorid" = $2 RETURNING *', [request.params.id, request.params.jugadorId]);
        const rows = queryresult.rows;
        if (rows.length === 0)
            return reply.status(404).send({ message: 'Comunidad no encontrada' });
        return reply.status(204).send(rows[0]);
    });

    fastify.post('/', {
        schema: communitySchemas.postSchema,
        onRequest: [
            fastify.auth
        ]
    }, async function (request, reply) {
        console.log("request", request.user)
        if (request.user.rolid != 1) return reply.status(401).send({ message: 'No autorizado, debe ser un jugador para crear una comunidad.' });
        const { nombre, descripcion, memberslimit } = request.body;
        const queryresult = await query('INSERT INTO "comunidades" ("nombre", "descripcion", "memberslimit") VALUES ($1, $2, $3) RETURNING *', [nombre, descripcion, memberslimit]);
        if (queryresult.rows.length === 0)
            return reply.status(500).send({ message: 'Error al crear la comunidad' });
        return reply.status(201).send(queryresult.rows[0]);
    });

    fastify.put('/:id', { schema: communitySchemas.putSchema }, async function (request, reply) {
        const paramId = request.params.id;
        const bodyId = request.body.id;
        try {
            if (paramId != bodyId) return reply.status(409).send({ message: 'La id del cuerpo y del parámetro no coinciden.' })
            const { nombre } = request.body;
            const queryresult = await query('UPDATE "comunidades" SET "nombre" = $1 WHERE "id" = $2 RETURNING *', [nombre, paramId]);
            const rows = queryresult.rows;
            if (rows.length === 0)
                return reply.status(404).send({ message: 'Comunidad no encontrada' });
            return reply.send(rows[0]);
        } catch (error) {
            return reply.status(500).send(error);
        }
    });

    // obtener todos los usuarios de la tabla Usuarios cuando su id esté en la tabla de ComunidadesUsuarios
    //DONE: el schema tira que fechaNac, telefonoId y direccionId no están siendo recibidos
    //DONE: Las comunidades son de usuarios? O de Jugadores? El diagrama dice jugadores.
    //Los nombres de tablas y columnas sin capitalizar, siempre, tira error de lo contrario
    fastify.get('/:id/jugadores', { schema: getAllSchema }, async function (request, reply) {
        const queryresult = await query('SELECT * FROM "usuarios" WHERE "id" IN (SELECT "jugadorid" FROM "comunidadjugador" WHERE "comunidadid" = $1)', [request.params.id]);
        const rows = queryresult.rows;
        if (rows.length === 0)
            return reply.status(204).send({ message: 'No hay jugadores en la comunidad' });
        return reply.send(rows);
    });

    //DONE: Tampoco veo posibilidad de borrar una comunidad. Quien crea las comunidades? Cualqueir jugador? El último la elimina? Si queda vacía se elimina sola?
    fastify.delete('/:id', { schema: communitySchemas.deleteSchema }, async function (request, reply) {
        const queryresult = await query('DELETE FROM "comunidades" WHERE "id" = $1 RETURNING *', [request.params.id]);
        const rows = queryresult.rows;
        if (rows.length === 0)
            return reply.status(404).send({ message: 'Comunidad no encontrada' });
        return reply.send(rows[0]);
    });

    fastify.get('/jugador/:id', async function (request, reply) {
        const id = request.params.id;
        const queryresult = await query('SELECT * FROM "comunidades" c JOIN "comunidadjugador" cj ON c.id = cj.comunidadid WHERE cj.jugadorid = $1', [id]);
        const rows = queryresult.rows;
        if (rows.length === 0)
            return reply.status(204).send({ message: 'No se comunidades para el jugador' });
        return reply.send(queryresult.rows);
    });

    fastify.post('/:id/moderador', {
        schema: communitySchemas.inscribirJugadorSchema,
        onRequest: [
            fastify.auth
        ]
    }, async function (request, reply) {
        const { jugadorid } = request.body;
        if (request.user.rolid != 1) return reply.status(401).send({ message: 'No autorizado, debe ser un jugador para crear una comunidad.' });
        const queryresult = await query('INSERT INTO "comunidadmoderador" ("comunidadid", "usuarioid") VALUES ($1, $2) RETURNING *', [request.params.id, jugadorid]);
        if (queryresult.rows.length === 0)
            return reply.status(500).send({ message: 'Error al agregar el jugador a la comunidad' });
        return reply.status(201).send(queryresult.rows[0]);
    });
}