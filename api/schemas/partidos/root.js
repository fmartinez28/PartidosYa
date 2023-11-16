const getAllSchema = {
    description: 'Obtiene todas las entradas de la entidad Partido',
    response: {
        200: {
            type: 'array',
            items: {
                $ref: 'genericSingleMatch'
            }
        },
        400: {
            $ref: 'genericErrorMessage'
        }
    }
}

const getByIdSchema = {
    description: 'Obtiene una entrada de la entidad Partido',
    response: {
        200: {
            $ref: 'genericSingleMatch'
        },
        404: {
            $ref: 'genericErrorMessage'
        }
    }
}

const postSchema = {
    description: 'Crea una entrada de la entidad Partido',
    body: {
        type: 'object',
        properties: {
            canchaid: { type: 'number' },
            fechacreacion: { type: 'string' },
            fechaprogramada: { type: 'string' },
            comunidadid: { type: 'number' },
            creadorid: { type: 'number' }
        },
        required: ['canchaid', 'fechacreacion', 'fechaprogramada', 'creadorid']
    },
    response: {
        201: {
            $ref: 'genericSingleMatch'
        },
        400: {
            $ref: 'genericErrorMessage'
        }
    }
}

const putSchema = {
    description: 'Actualiza una entrada de la entidad Partido',
    body: {
        type: 'object',
        properties: {
            id: { type: 'number' },
            canchaid: { type: 'number' },
            fechacreacion: { type: 'string' },
            fechaprogramada: { type: 'string' },
            comunidadid: { type: 'number' }
        },
        required: ['id', 'canchaid', 'fechacreacion', 'fechaprogramada', 'comunidadid']
    },
    response: {
        200: {
            $ref: 'genericSingleMatch'
        },
        400: {
            $ref: 'genericErrorMessage'
        }
    }
}
const postJugadoresSchema = {
    tags: ['Inscribir'],
    description: 'Inscribirse a un partido. La inscripción se agrega a la tabla ParticipacionPartido',
    body: {
        type: 'object',
        properties: {
            jugadorid: { type: 'number' }
        },
        required: ['jugadorid']
    },
    response: {
        200: {
            $ref: 'genericSingleSignUp'
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
    putSchema,
    postJugadoresSchema
}