const inscribirseSchema = {
    tags: ['Inscribir'],
    description: 'Inscribirse a un partido. La inscripción se agrega a la tabla ParticipacionPartido',
    body: {
        type: 'object',
        properties: {
            idJugador: { type: 'number' },
            idPartido: { type: 'number' }
        },
        required: ['idJugador', 'idPartido']
    },
    response: {
        200: {
            $ref: 'genericSingleSignUp'
        },
        400: {
            $ref: 'genericErrorMessage'
        }
    }
}

export {
    inscribirseSchema
}
