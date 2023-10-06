const getAllSchema = {
    description: 'Obtiene todas las entradas de la entidad Propietario',
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
    description: 'Obtiene una entrada de la entidad Propietario',
    response: {
        200: {
            $ref: 'genericSingleUser'
        },
        404: {
            $ref: 'genericErrorMessage'
        }
    }
}

export {
    getAllSchema,
    getByIdSchema
}