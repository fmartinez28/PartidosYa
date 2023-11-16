import { query } from "../../db/index.js";
import * as ownersSchemas from '../../schemas/propietarios/root.js';
import * as canchasSchemas from '../../schemas/canchas/root.js';

export default async function (fastify, opts) {
    fastify.get('/', { schema: ownersSchemas.getAllSchema }, async function (request, reply) {
        // top 10 queries de los videojuegos
        // debería tomar todos los usuarios que sean propietarios
        const queryresult = await query('SELECT * FROM usuarios where rolid = 2');
        const rows = queryresult.rows;
        if (rows.length === 0)
            return reply.status(204).send({ message: 'No se encontraron propietarios' });
        return reply.send(queryresult.rows);
    });

    // seleccionar de la tabla propietarios el propietario que coincida la ID. Seleccionar de la tabla usuarios el usuario que coincida la ID. Retornar el Usuario.
    fastify.get('/:id', { schema: ownersSchemas.getByIdSchema }, async function (request, reply) {
        const queryresult = await query('SELECT * FROM "usuarios" WHERE "id" = $1 and rolid = 2', [request.params.id]);
        const rows = queryresult.rows;
        if (rows.length === 0)
            return reply.status(404).send({ message: 'No se encontró un usuario con ese id o el usuario no correspondía a un propietario.' });
        return reply.status(200).send(rows[0]);
    });

    fastify.get('/:id/canchas', { schema: canchasSchemas.getAllSchema }, async function (request, reply) {
        const queryresult = await query('SELECT * FROM "canchas" WHERE "propietarioid" = $1', [request.params.id]);
        const rows = queryresult.rows;
        if (rows.length === 0)
            return reply.status(204).send({ message: `No se encontraron canchas para el propietario ` });
        return reply.send(queryresult.rows);
    });
}