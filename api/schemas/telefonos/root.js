// telefonos
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

// un telefono tiene CodPais, codArea, Numero. Todos son strings
const postSchema = {
    description: 'Crea una entrada de la entidad Telefono',
    body: {
        type: 'object',
        properties: {
            CodPais: { type: 'string' },
            CodArea: { type: 'string' },
            Numero: { type: 'string' }
        },
        required: ['CodPais', 'CodArea', 'Numero']
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
            CodPais: { type: 'string' },
            CodArea: { type: 'string' },
            Numero: { type: 'string' }
        },
        required: ['id', 'CodPais', 'CodArea', 'Numero']
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
