import { query } from "../../db/index.js";

export default async function(fastify, opts) {
    fastify.get('/', async function(request, reply) {
        // top 10 queries de los videojuegos
        // debería tomar todos los usuarios que sean jugadores
        const queryresult  = await query('SELECT Usuarios.* FROM Usuarios JOIN Jugadores ON Usuarios.Id = Jugadores.UsuarioId');
        const rows = queryresult.rows;
        if (rows.length === 0)
            return reply.status(204).send({message: 'No se encontraron jugadores'});
        return reply.send(queryresult.rows);
    });

    // seleccionar de la tabla Jugadores el jugador que coincida la ID. Seleccionar de la tabla Usuarios el usuario que coincida la ID. Retornar el Usuario.
    fastify.get('/:id', async function(request, reply) {
        const queryresult  = await query('SELECT * FROM "Jugadores" WHERE "Id" = $1', [request.params.id]);
        const rows = queryresult.rows;
        if (rows.length === 0)
            return reply.status(404).send({error: 'Jugador no encontrado'});
        const usuarioQueryResult = await query('SELECT * FROM "Usuarios" WHERE "Id" = $1', [rows[0].UsuarioId]);
        const rowsUsuario = usuarioQueryResult.rows;
        if (rowsUsuario.length === 0)
            return reply.status(404).send({error: 'No se encontró un usuario cuyo Id corresponda al Id del jugador solicitado'});
        return reply.status(200).send(rowsUsuario[0]);
    });
}