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
            SELECT u.id, u.username, 
                CASE 
                    WHEN j.usuarioid IS NOT NULL THEN 'jugador'
                    WHEN p.usuarioid IS NOT NULL THEN 'propietario'
                    ELSE 'administrador'
                END AS role
            FROM usuarios u
            LEFT JOIN jugadores j ON u.id = j.usuarioid
            LEFT JOIN propietarios p ON u.id = p.usuarioid
            where u.username = $1 and u.password = crypt($2, u.password);
            `, [username, password]);
            if (res.rows.length === 0) return reply.status(401).send({ message: 'Credenciales incorrectas' });
            const { id, role } = res.rows[0];
            const token = fastify.jwt.sign({id, role}, {
                expiresIn: '1h'
            });
            const userData = {
                id,
                username,
                role
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