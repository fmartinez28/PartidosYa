import { query } from "../../db/index.js";
import * as userSchemas from '../../schemas/usuarios/root.js';

export default async function(fastify, opts) {
    fastify.get('/', { schema: userSchemas.getAllSchema }, async function(request, reply) {
        const queryresult  = await query('SELECT * FROM "usuarios"');
        return reply.send(queryresult.rows);
    });

    fastify.get('/:id', { schema: userSchemas.getByIdSchema }, async function(req, reply){
        const id = req.params.id;
        try{
            const res = await query('SELECT * FROM "usuarios" WHERE id = $1', [id]);
            console.log(res);
            if (res.rows.length === 0) return reply.status(404).send({ error: 'No existe el usuario solicitado'});
            return reply.send(res.rows[0]);
        } catch (error){
            return reply.status(500).send({ message: error});
        }
    });
    
    fastify.post('/', { schema: userSchemas.postSchema }, async function(req, reply){
        const queryresult = await query('INSERT INTO "usuarios" ("nombre", "apellido", "fechanac", "telefonoid", "direccionid") VALUES ($1, $2, $3, $4, $5) RETURNING *', [req.body.nombre, req.body.apellido, req.body.fechanac, req.body.telefonoid, req.body.direccionid]);
        if(queryresult.rows.length === 0)
            return reply.status(500).send({error: 'Error al crear el usuario'});
        return reply.status(201).send(queryresult.rows[0]);
    });
        
    fastify.put('/:id', { schema: userSchemas.putSchema }, async function(req, reply){
        const paramId = req.params.id;
        const bodyId = req.body.id;
        try{
            if (paramId != bodyId) return reply.status(409).send({error: 'La id del parámetro no puede ser diferente a la id del cuerpo de la request.'});
            const { nombre, apellido, fechanac, telefonoid, direccionid } = req.body;
            const queryresult = await query('UPDATE "usuarios" SET "nombre" = $1, "apellido" = $2, "fechanac" = $3, "telefonoid" = $4, "direccionid" = $5 WHERE "id" = $6 RETURNING *', [nombre, apellido, fechanac, telefonoid, direccionid, paramsId]);
            if(queryresult.rows.length === 0)
                return reply.status(500).send({error: 'Error al actualizar el usuario'});
            return reply.status(200).send(queryresult.rows[0]);
        } catch (error){
            return reply.status(500).send(error);
        }
    });
}