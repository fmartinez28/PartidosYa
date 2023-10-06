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
            canchaId: { type: 'number'},
            fechaCreacion: { type: 'string'},
            fechaProgramada: { type: 'string'},
            comunidadId: { type: 'number'}
        },
        required: ['canchaId', 'fechaCreacion', 'fechaProgramada', 'comunidadId']
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
            id: { type: 'number'},
            canchaId: { type: 'number'},
            fechaCreacion: { type: 'string'},
            fechaProgramada: { type: 'string'},
            comunidadId: { type: 'number'}
        },
        required: ['id', 'canchaId', 'fechaCreacion', 'fechaProgramada', 'comunidadId']
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

export {
    getAllSchema,
    getByIdSchema,
    postSchema,
    putSchema
}