import { query } from '../../db/index.js';
//Un schema básico por el momento
const loginSchema = {
    body: {
        type: 'object',
        properties: {
            username: { type: 'string' },
            password: { type: 'string' }
            
        },
        required: ['username', 'password']
    },
}

export default async function(fastify, opts){
    fastify.post('/', { 
        schema: loginSchema,
    }, async function (req, reply) {
        try {
            const { username, password } = req.body;
            /*
            Horrible query porque no lo pensamos así, podríamos cambiar para que usuarios tenga campo Rol que sea
            una FK a una tabla separada Roles con los distintos roles hardcodeados, y con endpoints sólo autorizados 
            para un admin, para la próxima ya aprendimos al menos... O lo cambiamos y fixeamos todos los tests que se rompan.
            */
            const res = await query(
            `
            SELECT id, username, rolid
            FROM usuarios
            WHERE username = $1 and password = crypt($2, password);
            `, [username, password]);
            if (res.rows.length === 0) return reply.status(401).send({ message: 'Credenciales incorrectas' });
            const { id, rolid } = res.rows[0];
            const token = fastify.jwt.sign({id, rolid}, {
                expiresIn: '1h'
            });
            const userData = {
                id,
                username,
                rolid
            }
            return reply.status(201).send({
                ...userData,
                token: token
            });
        } catch (error) {
            return reply.status(500).send({ message: error });
        }
    });
}