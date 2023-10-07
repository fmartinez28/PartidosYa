const genericSingleUserSchema = {
    $id: 'genericSingleUser',
    type: 'object',
    properties: {
        nombre: { type: 'string' },
        apellido: { type: 'string' },
        fechaNac: {
            type: 'string',
            format: 'date'
        },
        telefonoId: { type: 'number' },
        direccionId: { type: 'number' },
    },
    required: ['nombre', 'apellido', 'fechaNac', 'telefonoId', 'direccionId']
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

const genericSingleMatch = {
    $id: 'genericSingleMatch',
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

// un telefono tiene CodPais, codArea, Numero. Todos son strings
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
