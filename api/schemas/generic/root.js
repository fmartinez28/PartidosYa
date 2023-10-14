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
        canchanum: { type: 'string' },
        direccionid: { type: 'number' },
        propietarioid: { type: 'number' }
    },
    required: ['nombre', 'canchanum', 'direccionid', 'propietarioid']
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
        pais: { type: 'string' },
        estado: { type: 'string' },
        ciudad: { type: 'string' },
        calle: { type: 'string' },
        numero: { type: 'number' }
    },
    required: ['pais', 'estado', 'ciudad', 'calle', 'numero']
}

const genericSingleMatch = {
    $id: 'genericSingleMatch',
    type: 'object',
    properties: {
        canchaid: { type: 'number' },
        fechacreacion: {
            type: 'string',
            format: 'date'
        },
        fechaprogramada: {
            type: 'string',
            format: 'date'
        },
        comunidadid: { type: 'number' }
    },
    required: ['canchaid', 'fechacreacion', 'fechaprogramada', 'comunidadid']

}

const genericSingleSignUp = {
    $id: 'genericSingleSignUp',
    type: 'object',
    properties: {
        idjugador: { type: 'number' },
        idpartido: { type: 'number' }
    },
    required: ['idjugador', 'idpartido']
}

const genericSingleCommunityPlayer = {
    $id: 'genericSingleCommunityPlayer',
    type: 'object',
    properties: {
        idjugador: { type: 'number' },
        idcomunidad: { type: 'number' }
    },
    required: ['idjugador', 'idcomunidad']
}

const genericSinglePhone = {
    $id: 'genericSinglePhone',
    type: 'object',
    properties: {
        codpais: { type: 'string' },
        codarea: { type: 'string' },
        numero: { type: 'string' }
    },
    required: ['codpais', 'codarea', 'numero']
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
