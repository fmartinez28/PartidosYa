import { query } from "../../db/index.js";

export default async function(fastify, opts) {
    fastify.get('/', async function(request, reply) {
        const queryresult  = await query('SELECT * FROM "Usuarios"');
        return reply.send(queryresult.rows);
    });

    fastify.get('/:id', async function(req, reply){
        const id = req.params.id;
        try{
            const res = await query('SELECT FROM "Usuarios" WHERE id = $1', [id]);
            if (res.rows.length === 0) return reply.status(404).send({ error: 'No existe el usuario solicitado'});
            return reply.send(res.rows[0]);
        } catch (error){
            return reply.status(500).send(error);
        }
    });
    
    fastify.post('/', async function(req, reply){
        const queryresult = await query('INSERT INTO "Usuarios" ("Nombre", "Apellido", "FechaNac", "TelefonoId", "DireccionId") VALUES ($1, $2, $3, $4, $5) RETURNING *', [req.body.nombre, req.body.apellido, req.body.fechaNac, req.body.telefonoId, req.body.direccionId]);
        if(queryresult.rows.length === 0)
            return reply.status(500).send({error: 'Error al crear el usuario'});
        return reply.send(queryresult.rows[0]);
    });
        
    fastify.put('/:id', async function(req, reply){
        const paramId = req.params.id;
        const bodyId = req.body.id;
        try{
            if (paramId != bodyId) return reply.status(409).send({error: 'La id del parámetro no puede ser diferente a la id del cuerpo de la request.'});
            const { nombre, apellido, fechaNac, telefonoId, direccionId } = req.body;
            const queryresult = await query('UPDATE "Usuarios" SET "Nombre" = $1, "Apellido" = $2, "FechaNac" = $3, "TelefonoId" = $4, "DireccionId" = $5 WHERE "Id" = $6 RETURNING *', [nombre, apellido, fechaNac, telefonoId, direccionId, paramsId]);
            if(queryresult.rows.length === 0)
                return reply.status(500).send({error: 'Error al actualizar el usuario'});
            return reply.send(queryresult.rows[0]);
        } catch (error){
            return reply.status(500).send(error);
        }
    });
}