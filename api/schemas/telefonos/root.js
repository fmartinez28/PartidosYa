const getAllSchema = {
    description: 'Obtiene todas las entradas de la entidad Telefono',
    response: {
        200: {
            type: 'array',
            items: {
                $ref: 'genericSinglePhone'
            }
        },
        400: {
            $ref: 'genericErrorMessage'
        }
    }
}

const getByIdSchema = {
    description: 'Obtiene una entrada de la entidad Telefono',
    response: {
        200: {
            $ref: 'genericSinglePhone'
        },
        404: {
            $ref: 'genericErrorMessage'
        }
    }
}

const postSchema = {
    description: 'Crea una entrada de la entidad Telefono',
    body: {
        type: 'object',
        properties: {
            codpais: { type: 'string' },
            codarea: { type: 'string' },
            numero: { type: 'string' }
        },
        required: ['codpais', 'codarea', 'numero']
    },
    response: {
        201: {
            $ref: 'genericSinglePhone'
        },
        400: {
            $ref: 'genericErrorMessage'
        }
    }
}

const putSchema = {
    description: 'Actualiza una entrada de la entidad Telefono',
    body: {
        type: 'object',
        properties: {
            id: { type: 'number' },
            codpais: { type: 'string' },
            codarea: { type: 'string' },
            numero: { type: 'string' }
        },
        required: ['id', 'codpais', 'codarea', 'numero']
    },
    response: {
        200: {
            $ref: 'genericSinglePhone'
        },
        404: {
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
