import { query } from "../../db/index.js";
import * as ownersSchemas from '../../schemas/propietarios/root.js';

export default async function (fastify, opts) {
    fastify.get('/', { schema: ownersSchemas.getAllSchema }, async function (request, reply) {
        // top 10 queries de los videojuegos
        // debería tomar todos los usuarios que sean propietarios
        const queryresult = await query('SELECT usuarios.* FROM usuarios JOIN propietarios ON usuarios.id = propietarios.usuarioid');
        const rows = queryresult.rows;
        if (rows.length === 0)
            return reply.status(204).send({ message: 'No se encontraron propietarios' });
        return reply.send(queryresult.rows);
    });

    // seleccionar de la tabla propietarios el propietario que coincida la ID. Seleccionar de la tabla usuarios el usuario que coincida la ID. Retornar el Usuario.
    fastify.get('/:id', { schema: ownersSchemas.getByIdSchema }, async function (request, reply) {
        const queryresult = await query('SELECT * FROM "propietarios" WHERE "usuarioid" = $1', [request.params.id]);
        const rows = queryresult.rows;
        if (rows.length === 0)
            return reply.status(404).send({ error: 'Propietario no encontrado' });
        const usuarioQueryResult = await query('SELECT * FROM "usuarios" WHERE "id" = $1', [rows[0].usuarioid]);
        const rowsUsuario = usuarioQueryResult.rows;
        if (rowsUsuario.length === 0)
            return reply.status(404).send({ error: 'No se encontró un usuario cuyo Id corresponda al Id del propietario solicitado' });
        return reply.status(200).send(rowsUsuario[0]);
    });

    fastify.post('/', { schema: ownersSchemas.postSchema }, async function (request, reply) {
        const { usuarioid } = request.body;
        const queryresult = await query('INSERT INTO "propietarios" ("usuarioid") VALUES ($1) RETURNING *', [usuarioid]);
        if (queryresult.rows.length === 0)
            return reply.status(500).send({ message: 'Error al crear el propietario' });
        return reply.send(queryresult.rows[0]);
    });

    fastify.delete('/:id', { schema: ownersSchemas.deleteSchema }, async function (request, reply) {
        const id = request.params.id;
        try {
            const queryresult = await query('DELETE FROM "propietarios" WHERE "usuarioid" = $1 RETURNING *', [id]);
            if (queryresult.rows.length === 0)
                return reply.status(404).send({ message: 'Propietario no encontrado' });
            return reply.status(200).send({ message: "El propietario fue eliminado" });
        } catch (error) {
            return reply.status(500).send({ message: error });
        }
    });
}