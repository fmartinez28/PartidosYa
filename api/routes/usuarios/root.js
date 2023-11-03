import { query } from "../../db/index.js";
import * as userSchemas from '../../schemas/usuarios/root.js';

export default async function (fastify, opts) {
    fastify.get('/', { schema: userSchemas.getAllSchema }, async function (req, reply) {
        const queryresult = await query('SELECT nombre, apellido, email, username, fechanac, telefonoid, direccionid FROM "usuarios"');
        if (queryresult.rows.length === 0)
            return reply.status(204).send({ message: 'No hay entradas para la colección usuarios.' });
        return reply.send(queryresult.rows);
    });

    fastify.get('/:id', { schema: userSchemas.getByIdSchema }, async function (req, reply) {
        const id = req.params.id;
        try {
            const res = await query('SELECT id, nombre, apellido, email, username, fechanac, telefonoid, direccionid FROM "usuarios" WHERE id = $1', [id]);
            if (res.rows.length === 0) return reply.status(404).send({ message: 'No existe el usuario solicitado' });
            return reply.send(res.rows[0]);
        } catch (error) {
            return reply.status(500).send({ message: error });
        }
    });

    fastify.post('/', { schema: userSchemas.postSchema }, async function (req, reply) {
        const { nombre, apellido, email, username, password, fechanac, telefonoid, direccionid } = req.body;
        const queryresult = await query('INSERT INTO "usuarios" ("nombre", "apellido", "email", "username", "password", "fechanac", "telefonoid", "direccionid") VALUES ($1, $2, $3, $4, crypt($5, gen_salt(\'bf\')), $6, $7, $8) RETURNING "id", "nombre", "apellido", "email", "username", "fechanac", "telefonoid", "direccionid"', [nombre, apellido, email, username, password, fechanac, telefonoid, direccionid]);
        if (queryresult.rows.length === 0)
            return reply.status(500).send({ message: 'Error al crear el usuario' });
        return reply.status(201).send(queryresult.rows[0]);
    });

    fastify.put('/:id', { schema: userSchemas.putSchema }, async function (req, reply) {
        const paramId = req.params.id;
        const bodyId = req.body.id;
        try {
            if (paramId != bodyId) return reply.status(409).send({ message: 'La id del parámetro no puede ser diferente a la id del cuerpo de la request.' });
            const { nombre, apellido, fechanac, email, username, password, telefonoid, direccionid } = req.body;
            const queryresult = await query('UPDATE "usuarios" SET "nombre" = $1, "apellido" = $2, "email" = $3, "username" = $4, "password" = crypt($5, gen_salt(\'bf\')), "fechanac" = $6, "telefonoid" = $7, "direccionid" = $8 WHERE "id" = $9 RETURNING "id", "nombre", "apellido", "email", "username", "fechanac", "telefonoid", "direccionid"', [nombre, apellido, email, username, password, fechanac, telefonoid, direccionid, paramId]);
            if (queryresult.rows.length === 0)
                return reply.status(500).send({ message: 'Error al actualizar el usuario' });
            return reply.status(200).send(queryresult.rows[0]);
        } catch (error) {
            return reply.status(500).send(error);
        }
    });

    fastify.delete('/:id', { schema: userSchemas.deleteSchema }, async function (req, reply) {
        const id = req.params.id;
        try {
            const queryresult = await query('DELETE FROM "usuarios" WHERE "id" = $1 RETURNING *', [id]);
            if (queryresult.rows.length === 0)
                return reply.status(404).send({ message: 'Usuario no encontrado' });
            return reply.status(200).send({ message: "El usuario fue eliminado" });
        } catch (error) {
            return reply.status(500).send(error);
        }
    });
}