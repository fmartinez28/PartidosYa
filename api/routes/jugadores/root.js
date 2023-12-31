import { query } from "../../db/index.js";
import * as playersSchemas from '../../schemas/jugadores/root.js';

export default async function (fastify, opts) {
    fastify.get('/', { schema: playersSchemas.getAllSchema }, async function (request, reply) {
        // top 10 queries de los videojuegos
        // debería tomar todos los usuarios que sean jugadores
        const queryresult = await query('SELECT * FROM usuarios where rolid = 1');
        const rows = queryresult.rows;
        if (rows.length === 0)
            return reply.status(204).send({ message: 'No se encontraron jugadores' });
        return reply.send(queryresult.rows);
    });

    // seleccionar de la tabla jugadores el jugador que coincida la ID. Seleccionar de la tabla usuarios el usuario que coincida la ID. Retornar el Usuario.
    fastify.get('/:id', { schema: playersSchemas.getByIdSchema }, async function (request, reply) {
        const queryresult = await query('SELECT * FROM usuarios WHERE id = $1 and rolid = 1', [request.params.id]);
        const rows = queryresult.rows;
        if (rows.length === 0)
            return reply.status(404).send({ error: 'No se encontró un usuario con ese id o el usuario encontrado no era un jugador' });
        //FIXME: Vichen el plugin  sensible por si les queda más facil para manejar las respuestas de error.
        //FIXME: Ojo que TODOS los 404 devuelvan un mismo "schema". ¿no lo simplificaron demasiado?
        return reply.status(200).send(rows[0]);
    });
}