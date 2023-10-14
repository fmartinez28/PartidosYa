const genericSingleUserSchema = {
    $id: 'genericSingleUser',
    type: 'object',
    properties: {
        nombre: { type: 'string' },
        apellido: { type: 'string' },
        telefonoid: { type: 'number' },
        direccionid: { type: 'number' },
        fechanac: {
            type: 'string',
            format: 'date'
        },
    },
    required: ['nombre', 'apellido', 'fechanac', 'telefonoid', 'direccionid']
}

const genericErrorMessageSchema = {
    $id: 'genericErrorMessage',
    type: 'object',
    properties: {
        message: { type: 'string' }
    },
    required: ['message']
}

const genericSingleCourtSchema = {
    $id: 'genericSingleCourt',
    type: 'object',
    properties: {
        nombre: { type: 'string' },
        canchaNum: { type: 'string' },
        direccionId: { type: 'number' },
        propietarioId: { type: 'number' }
    },
    required: ['nombre', 'canchaNum', 'direccionId', 'propietarioId']
}

const genericSingleCommunitySchema = {
    $id: 'genericSingleCommunity',
    type: 'object',
    properties: {
        nombre: { type: 'string' },
    },
    required: ['nombre']

}

const genericSingleAddressSchema = {
    $id: 'genericSingleAddress',
    type: 'object',
    properties: {
        Pais: { type: 'string' },
        Estado: { type: 'string' },
        Ciudad: { type: 'string' },
        Calle: { type: 'string' },
        Numero: { type: 'number' }
    },
    required: ['Pais', 'Estado', 'Ciudad', 'Calle', 'Numero']
}

const genericSingleMatch = {
    $id: 'genericSingleMatch',
    type: 'object',
    properties: {
        canchaId: { type: 'number' },
        fechaCreacion: {
            type: 'string',
            format: 'date'
        },
        fechaProgramada: {
            type: 'string',
            format: 'date'
        },
        comunidadId: { type: 'number' }
    },
    required: ['canchaId', 'fechaCreacion', 'fechaProgramada', 'comunidadId']

}

const genericSingleSignUp = {
    $id: 'genericSingleSignUp',
    type: 'object',
    properties: {
        idJugador: { type: 'number' },
        idPartido: { type: 'number' }
    },
    required: ['idJugador', 'idPartido']
}

const genericSingleCommunityPlayer = {
    $id: 'genericSingleCommunityPlayer',
    type: 'object',
    properties: {
        idJugador: { type: 'number' },
        idComunidad: { type: 'number' }
    },
    required: ['idJugador', 'idComunidad']
}

const genericSinglePhone = {
    $id: 'genericSinglePhone',
    type: 'object',
    properties: {
        CodPais: { type: 'string' },
        CodArea: { type: 'string' },
        Numero: { type: 'string' }
    },
    required: ['CodPais', 'CodArea', 'Numero']
}


export {
    genericErrorMessageSchema,
    genericSingleUserSchema,
    genericSingleAddressSchema,
    genericSingleCourtSchema,
    genericSingleCommunitySchema,
    genericSingleMatch,
    genericSingleSignUp,
    genericSingleCommunityPlayer,
    genericSinglePhone
}
