const getAllSchema = {
    description: 'Obtiene todas las entradas de la entidad Dirección',
    response: {
        200: {
            type: 'array',
            items: {
                $ref: 'genericSingleAddress' // TODO
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

const postSchema = {//
    description: 'Crea una entrada de la entidad Dirección',
    body: {
        type: 'object',
        properties: {
            Pais: { type: 'string' },
            Estado: { type: 'string' },
            Ciudad: { type: 'string' },
            Calle: { type: 'string' },
            Numero: { type: 'number' }
        },
        required: ['Pais', 'Estado', 'Ciudad', 'Calle', 'Numero']
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
            Pais: { type: 'string' },
            Estado: { type: 'string' },
            Ciudad: { type: 'string' },
            Calle: { type: 'string' },
            Numero: { type: 'number' }
        },
        required: ['id', 'Pais', 'Estado', 'Ciudad', 'Calle', 'Numero']
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