const getAllSchema = {
    description: 'Obtiene todas las entradas de la entidad Dirección',
    response: {
        200: {
            type: 'array',
            items: {
                $ref: 'genericSingleAddress'
            }
        },
        400: {
            $ref: 'genericErrorMessage'
        }
    }
}

const getByIdSchema = {
    description: 'Obtiene una entrada de la entidad Dirección',
    response: {
        200: {
            $ref: 'genericSingleAddress'
        },
        404: {
            $ref: 'genericErrorMessage'
        }
    }
}

const postSchema = {
    description: 'Crea una entrada de la entidad Dirección',
    body: {
        type: 'object',
        properties: {
            pais: { type: 'string' },
            estado: { type: 'string' },
            ciudad: { type: 'string' },
            calle: { type: 'string' },
            numero: { type: 'number' }
        },
        required: ['pais', 'estado', 'ciudad', 'calle', 'numero']
    },
    response: {
        201: {
            $ref: 'genericSingleAddress'
        },
        400: {
            $ref: 'genericErrorMessage'
        }
    }
}

const putSchema = {
    description: 'Actualiza una entrada de la entidad Dirección',
    body: {
        type: 'object',
        properties: {
            id: { type: 'number' },
            pais: { type: 'string' },
            estado: { type: 'string' },
            ciudad: { type: 'string' },
            calle: { type: 'string' },
            numero: { type: 'number' }
        },
        required: ['id', 'pais', 'estado', 'ciudad', 'calle', 'numero']
    },
    response: {
        200: {
            $ref: 'genericSingleAddress'
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