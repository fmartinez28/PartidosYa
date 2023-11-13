import { query } from "../../db/index.js";
import * as playersSchemas from '../../schemas/jugadores/root.js';

export default async function (fastify, opts) {
    fastify.get('/', { schema: playersSchemas.getAllSchema }, async function (request, reply) {
        // top 10 queries de los videojuegos
        // debería tomar todos los usuarios que sean jugadores
        const queryresult = await query('SELECT usuarios.* FROM usuarios JOIN jugadores ON usuarios.id = jugadores.usuarioid');
        const rows = queryresult.rows;
        if (rows.length === 0)
            return reply.status(204).send({ message: 'No se encontraron jugadores' });
        return reply.send(queryresult.rows);
    });

    // seleccionar de la tabla jugadores el jugador que coincida la ID. Seleccionar de la tabla usuarios el usuario que coincida la ID. Retornar el Usuario.
    fastify.get('/:id', { schema: playersSchemas.getByIdSchema }, async function (request, reply) {
        const queryresult = await query('SELECT * FROM "jugadores" WHERE "usuarioid" = $1', [request.params.id]);
        const rows = queryresult.rows;
        if (rows.length === 0)
            return reply.status(404).send({ error: 'Jugador no encontrado' });
        //FIXME: Vichen el plugin  sensible por si les queda más facil para manejar las respuestas de error.
        //FIXME: Ojo que TODOS los 404 devuelvan un mismo "schema". ¿no lo simplificaron demasiado?
        const usuarioQueryResult = await query('SELECT * FROM "usuarios" WHERE "id" = $1', [rows[0].usuarioid]);
        const rowsUsuario = usuarioQueryResult.rows;
        if (rowsUsuario.length === 0)
            return reply.status(404).send({ error: 'No se encontró un usuario cuyo id corresponda al id del jugador solicitado' });
        return reply.status(200).send(rowsUsuario[0]);
    });

    fastify.post('/', { schema: playersSchemas.postSchema }, async function (request, reply) {
        const { usuarioid } = request.body;
        const queryresult = await query('INSERT INTO "jugadores" ("usuarioid") VALUES ($1) RETURNING *', [usuarioid]);
        if (queryresult.rows.length === 0)
            return reply.status(500).send({ message: 'Error al crear el jugador' });
        return reply.status(201).send(queryresult.rows[0]);
    });

    fastify.delete('/:id', { schema: playersSchemas.deleteSchema }, async function (request, reply) {
        const id = request.params.id;
        try {
            const queryresult = await query('DELETE FROM "jugadores" WHERE "usuarioid" = $1 RETURNING *', [id]);
            if (queryresult.rows.length === 0)
                return reply.status(404).send({ message: 'Jugador no encontrado' });
            return reply.status(200).send({ message: "El jugador fue eliminado" });
        } catch (error) {
            return reply.status(500).send({ message: error });
        }
    });

    fastify.get('/comunidades/:id', async function (request, reply) {
        const id = request.params.id;
        const queryresult = await query('SELECT * FROM "comunidades" c JOIN "comunidadjugador" cj ON c.id = cj.comunidadid WHERE cj.jugadorid = $1', [id]);
        const rows = queryresult.rows;
        if (rows.length === 0)
            return reply.status(204).send({ message: 'No se comunidades para el jugador' });
        return reply.send(queryresult.rows);
    });
}