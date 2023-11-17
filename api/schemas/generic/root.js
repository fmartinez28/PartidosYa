const genericSingleUserSchema = {
    $id: 'genericSingleUser',
    type: 'object',
    properties: {
        id: { type: 'number' },
        nombre: { type: 'string' },
        apellido: { type: 'string' },
        email: { type: 'string' },
        username: { type: 'string' },
        telefonoid: { type: 'number' },
        direccionid: { type: 'number' },
        fechanac: {
            type: 'string',
            format: 'date'
        },
        rolid: { type: 'number' },
    },
    required: ['id', 'nombre', 'apellido', 'email', 'username', 'fechanac', 'telefonoid', 'direccionid', 'rolid']
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
        id: { type: 'number' },
        nombre: { type: 'string' },
        canchanum: { type: 'string' },
        direccionid: { type: 'number' },
        propietarioid: { type: 'number' },
        aprobada: { type: 'boolean' },
    },
    required: ['id', 'nombre', 'canchanum', 'direccionid', 'propietarioid']
}

const genericSingleCommunitySchema = {
    $id: 'genericSingleCommunity',
    type: 'object',
    properties: {
        id: { type: 'number' },
        nombre: { type: 'string' },
        descripcion: { type: 'string' },
        memberscount: { type: 'number' },
        memberslimit: { type: 'number' }
    },
    required: ['id', 'nombre']
}

const genericSingleAddressSchema = {
    $id: 'genericSingleAddress',
    type: 'object',
    properties: {
        id: { type: 'number' },
        pais: { type: 'string' },
        estado: { type: 'string' },
        ciudad: { type: 'string' },
        calle: { type: 'string' },
        numero: { type: 'number' }
    },
    required: ['id', 'pais', 'estado', 'ciudad', 'calle', 'numero']
}

const genericSingleMatch = {
    $id: 'genericSingleMatch',
    type: 'object',
    properties: {
        id: { type: 'number' },
        canchaid: { type: 'number' },
        fechacreacion: {
            type: 'string',
            format: 'date'
        },
        fechaprogramada: {
            type: 'string',
            format: 'date'
        },
        comunidadid: { type: 'number' },
        playerscount: { type: 'number' },
        playerslimit: { type: 'number' },
        aprobado: { type: 'boolean' },
    },
    required: ['id', 'canchaid', 'fechacreacion', 'fechaprogramada', 'comunidadid']

}

const genericSingleSignUp = {
    $id: 'genericSingleSignUp',
    type: 'object',
    properties: {
        id: { type: 'number' },
        idjugador: { type: 'number' },
        idpartido: { type: 'number' }
    },
    required: ['id', 'idjugador', 'idpartido']
}

const genericSingleCommunityPlayer = {
    $id: 'genericSingleCommunityPlayer',
    type: 'object',
    properties: {
        id: { type: 'number' },
        idjugador: { type: 'number' },
        idcomunidad: { type: 'number' }
    },
    required: ['id', 'idjugador', 'idcomunidad']
}

const genericSinglePhone = {
    $id: 'genericSinglePhone',
    type: 'object',
    properties: {
        id: { type: 'number' },
        codpais: { type: 'string' },
        codarea: { type: 'string' },
        numero: { type: 'string' }
    },
    required: ['id', 'codpais', 'codarea', 'numero']
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
