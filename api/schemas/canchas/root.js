const getAllSchema = {
    description: 'Obtiene todas las entradas de la entidad Cancha',
    response: {
        200: {
            type: 'array',
            items: {
                $ref: 'genericSingleCourt'
            }
        },
        400: {
            $ref: 'genericErrorMessage'
        }
    }
}

const getByIdSchema = {
    description: 'Obtiene una entrada de la entidad Cancha',
    response: {
        200: {
            $ref: 'genericSingleCourt'
        },
        404: {
            $ref: 'genericErrorMessage'
        }
    }
}

const postSchema = {
    description: 'Crea una entrada de la entidad Cancha',
    body: {
        type: 'object',
        properties: {
            nombre: { type: 'string'},
            direccionId: { type: 'number'},
            propietarioId: { type: 'number'},
            canchaNum: { type: 'number' } 
        },
        required: ['nombre', 'direccionId', 'propietarioId', 'canchaNum']
    },
    response: {
        201: {
            $ref: 'genericSingleCourt'
        },
        400: {
            $ref: 'genericErrorMessage'
        }
    }
}

const putSchema = {
    description: 'Actualiza una entrada de la entidad Cancha',
    body: {
        type: 'object',
        properties: {
            id: { type: 'number'},
            nombre: { type: 'string'},
            direccionId: { type: 'number'},
            propietarioId: { type: 'number'},
            canchaNum: { type: 'number' } 
        },
        required: ['id', 'nombre', 'direccionId', 'propietarioId', 'canchaNum']
    },
    response: {
        200: {
            $ref: 'genericSingleCourt'
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