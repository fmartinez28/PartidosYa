const getAllSchema = {
    description: 'Obtiene todas las entradas de la entidad Comunidad',
    response: {
        200: {
            type: 'array',
            items: {
                $ref: 'genericSingleCommunity' // TODO
            }
        },
        400: {
            $ref: 'genericErrorMessage'
        }
    }
}

const getByIdSchema = {
    description: 'Obtiene una entrada de la entidad Comunidad',
    response: {
        200: {
            $ref: 'genericSingleCommunity'
        },
        404: {
            $ref: 'genericErrorMessage'
        }
    }
}

const postSchema = {
    description: 'Crea una entrada de la entidad Comunidad',
    body: {
        type: 'object',
        properties: {
            nombre: { type: 'string' }
        },
        required: ['nombre']
    },
    response: {
        201: {
            $ref: 'genericSingleCommunity'
        },
        400: {
            $ref: 'genericErrorMessage'
        }
    }
}

const putSchema = {
    description: 'Actualiza una entrada de la entidad Comunidad',
    body: {
        type: 'object',
        properties: {
            id: { type: 'number' },
            nombre: { type: 'string' }
        },
        required: ['id', 'nombre']
    },
    response: {
        200: {
            $ref: 'genericSingleCommunity'
        },
        404: {
            $ref: 'genericErrorMessage'
        }
    }
}

// corresponde al POST /:id que recibe un UsuarioID
const inscribirJugadorSchema = {
    description: 'Inscribe un jugador a una comunidad',
    body: {
        type: 'object',
        properties: {
            idUsuario: { type: 'number' }
        },
        required: ['idUsuario']
    },
    response: {
        200: {
            $ref: 'genericSingleCommunityPlayer'
        },
        404: {
            $ref: 'genericErrorMessage'
        }
    }
}

const desinscribirJugadorSchema = {
    description: 'Desinscribe un jugador de una comunidad',
    response: {
        200: {
            $ref: 'genericSingleCommunityPlayer'
        },
        404: {
            $ref: 'genericErrorMessage'
        }
    }
}

export {
    getAllSchema,
    getByIdSchema,
    putSchema,
    postSchema,
    inscribirJugadorSchema,
    desinscribirJugadorSchema
}