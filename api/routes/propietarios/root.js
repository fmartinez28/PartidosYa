import { query } from "../../db/index.js";
import * as ownersSchemas from '../../schemas/propietarios/root.js';


export default async function(fastify, opts) {
    fastify.get('/', { schema: ownersSchemas.getAllSchema } , async function(request, reply) {
        // top 10 queries de los videojuegos
        // debería tomar todos los usuarios que sean propietarios
        const queryresult  = await query('SELECT Usuarios.* FROM Usuarios JOIN Propietarios ON Usuarios.Id = Propietarios.UsuarioId');
        const rows = queryresult.rows;
        if (rows.length === 0)
            return reply.status(204).send({message: 'No se encontraron propietarios'});
        return reply.send(queryresult.rows);
    });

    // seleccionar de la tabla Propietarios el propietario que coincida la ID. Seleccionar de la tabla Usuarios el usuario que coincida la ID. Retornar el Usuario.
    fastify.get('/:id', { schema: ownersSchemas.getByIdSchema } , async function(request, reply) {
        const queryresult  = await query('SELECT * FROM "Propietarios" WHERE "Id" = $1', [request.params.id]);
        const rows = queryresult.rows;
        if (rows.length === 0)
            return reply.status(404).send({error: 'Propietario no encontrado'});
        const usuarioQueryResult = await query('SELECT * FROM "Usuarios" WHERE "Id" = $1', [rows[0].UsuarioId]);
        const rowsUsuario = usuarioQueryResult.rows;
        if (rowsUsuario.length === 0)
            return reply.status(404).send({error: 'No se encontró un usuario cuyo Id corresponda al Id del propietario solicitado'});
        return reply.status(200).send(rowsUsuario[0]);
    });
}