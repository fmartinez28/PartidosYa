//Un schema para hacer prueba del login, cambaiarlo después (modificar las entidades quizá)
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
        const { username, password } = req.body;
        //Aca en vez de esto debería ir una consulta a la BD que pida los datos del usuario y vea si coincide la contraseña
        //por ahora hardcodeado para probar que funciona
        if (username != 'Aprobado' || password != 'Aprobado') {
            return reply.status(401).send({ message: 'Credenciales incorrectas' });
        }
        
        const token = fastify.jwt.sign({ username }, {
            expiresIn: '1h'
        });
        return reply.status(201).send(token);
    });
}