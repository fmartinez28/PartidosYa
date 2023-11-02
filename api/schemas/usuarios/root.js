import { genericSingleUserSchema, genericErrorMessageSchema } from '../generic/root.js';


//TODO: Agregar los 'body' a un generic también?

const getAllSchema = {
    description: 'Retorna todas las entradas de la entidad Usuario',
    response: {
        200: {
            type: 'array',
            items: {
                $ref: 'genericSingleUser',
            }
        },
        204: {
            $ref: 'genericErrorMessage'
        }
    }
}

const getByIdSchema = {
    description: 'Retorna una entrada (por id) de la entidad Usuario',
    response: {
        200: {
            $ref: 'genericSingleUser'
        },
        404: {
            $ref: 'genericErrorMessage'
        }
    }
}

const postSchema = {
    description: 'Crea una entrada de la entidad Usuario',
    body: {
        type: 'object',
        properties: {
            nombre: { type: 'string' },
            apellido: { type: 'string' },
            email: { type: 'string' },
            username: { type: 'string' },
            password: { type: 'string' },
            fechanac: {
                type: 'string',
                format: 'date'
            },
            telefonoid: { type: 'number' },
            direccionid: { type: 'number' },
        },
        required: ['nombre', 'apellido', 'fechanac', 'email', 'username', 'password', 'telefonoid', 'direccionid']
    },
    response: {
        201: {
            $ref: 'genericSingleUser'
        },
        400: {
            $ref: 'genericErrorMessage'
        }
    }
}

const putSchema = {
    description: 'Actualiza una entrada de la entidad Usuario',
    body: {
        type: 'object',
        properties: {
            id: { type: 'number' },
            nombre: { type: 'string' },
            apellido: { type: 'string' },
            email: { type: 'string' },
            username: { type: 'string' },
            password: { type: 'string' },
            fechanac: {
                type: 'string',
                format: 'date'
            },
            telefonoid: { type: 'number' },
            direccionid: { type: 'number' },
        },
        required: ['id', 'nombre', 'apellido', 'email', 'username', 'password', 'fechanac', 'telefonoid', 'direccionid']
    },
    response: {
        200: {
            $ref: 'genericSingleUser'
        },
        400: {
            $ref: 'genericErrorMessage'
        }
    }
}

export {
    getAllSchema,
    getByIdSchema,
    postSchema,
    putSchema
}