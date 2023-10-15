const getAllSchema = {
    description: 'Obtiene todas las entradas de la entidad Jugador',
    response: {
        200: {
            type: 'array',
            items: {
                $ref: 'genericSingleUser'
            }
        },
        400: {
            $ref: 'genericErrorMessage'
        }
    }
}

const getByIdSchema = {
    description: 'Obtiene una entrada de la entidad Jugador',
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
    description: 'Crea una entrada de la entidad Jugador',
    body: {
        type: 'object',
        properties: {
            usuarioid: { type: 'number' }
        }
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

const deleteSchema = {
    description: 'Elimina una entrada de la entidad Jugador',
    response: {
        200: {
            type: 'object',
            properties: {
                message: { type: 'string' }
            }
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
    deleteSchema
}