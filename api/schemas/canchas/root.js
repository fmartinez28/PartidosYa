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
            nombre: { type: 'string' },
            direccionid: { type: 'number' },
            propietarioid: { type: 'number' },
            canchanum: { type: 'number' }
        },
        required: ['nombre', 'direccionid', 'propietarioid', 'canchanum']
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
            id: { type: 'number' },
            nombre: { type: 'string' },
            direccionid: { type: 'number' },
            propietarioid: { type: 'number' },
            canchanum: { type: 'number' }
        },
        required: ['id', 'nombre', 'direccionid', 'propietarioid', 'canchanum']
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

const deleteSchema = {
    description: 'Elimina una entrada de la entidad Cancha',
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
    putSchema,
    deleteSchema
}