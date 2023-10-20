import { test } from 'tap';
import { build } from '../../helper.js';
import { query } from '../../../db/index.js';
import * as normalize from '../../../utils/dbNormalization.js';
import { purge } from '../../../utils/dbPurge.js';

test("GET de todos los usuarios", async (t) => {
    const app = await build(t);
    
    const res = await app.inject({
        url: '/usuarios',
        method: 'GET'
    });
    t.equal(res.statusCode, 200);
});

// FIXME encontrar como arreglar esto
test("GET de todos los usuarios cuando no hay usuarios", async (t) => {
    /**
    const app = await build(t);
    await normalize.begin();

    await purge('usuarios');

    const res = await app.inject({
        url: '/usuarios',
        method: 'GET'
    });
    t.equal(res.statusCode, 204);

    t.teardown(async () => {
        await normalize.rollback();
    })
     */
})


test("GET de un solo usuario", async (t) => {
    const app = await build(t);

    const res = await app.inject({
        url: '/usuarios/1',
        method: 'GET'
    });
    t.equal(res.statusCode, 200);
});

test("GET de un solo usuario que no existe", async (t) => {
    const app = await build(t);

    const res = await app.inject({
        url: '/usuarios/0',
        method: 'GET'
    });
    t.equal(res.statusCode, 404);
});

test("GET de un solo usuario que no existe", async (t)=> {
    const app = await build(t);

    const res = await app.inject({
        url: '/usuarios/s',
        method: 'GET'
    });
    t.equal(res.statusCode, 500);
});

test("POST a usuarios, funcionando", async (t)=> {
    const app = await build(t);
    await normalize.begin();

    const direccionesRes = await app.inject({
        url: '/direcciones',
        method: 'POST',
        payload: {
            pais: "Argentina",
            estado: "Buenos Aires",
            ciudad: "La Plata",
            calle: "Calle de prueba",
            numero: 123
        }
    })

    const direccionId = JSON.parse(direccionesRes.payload).id;

    const telefonosRes = await app.inject({
        url: '/telefonos',
        method: 'POST',
        payload: {
            codpais: "54",
            codarea: "221",
            numero: "1234567"
        }
    })

    const telefonoId = JSON.parse(telefonosRes.payload).id;

    const res = await app.inject({
        url: '/usuarios/',
        method: 'POST',
        payload: {
            nombre: "Juan",
            apellido: "Perez",
            fechanac: "2020-01-01",
            telefonoid: telefonoId,
            direccionid: direccionId
        }
    });
    
    t.teardown(async () => {
        await normalize.rollback();
    })
    t.equal(res.statusCode, 201);
});

test("POST a usuarios, campos invalidos", async (t)=> {
    const app = await build(t);
    await normalize.begin();
    const res = await app.inject({
        url: '/usuarios/',
        method: 'POST',
        payload: {
            nombre: "Juan",
            apellido: "Perez",
            fechanac: "2020-01-01",
            telefonoid: 0,
            direccionid: 0
        }
    });
    t.teardown(async () => {
        await normalize.rollback();
    })
    t.equal(res.statusCode, 500);
});

test("PUT a usuarios, funcionando", async (t)=> {
    const app = await build(t);
    await normalize.begin();

    const direccionesRes = await app.inject({
        url: '/direcciones',
        method: 'POST',
        payload: {
            pais: "Argentina",
            estado: "Buenos Aires",
            ciudad: "La Plata",
            calle: "Calle de prueba",
            numero: 123
        }
    })

    const direccionId = JSON.parse(direccionesRes.payload).id;

    const telefonosRes = await app.inject({
        url: '/telefonos',
        method: 'POST',
        payload: {
            codpais: "54",
            codarea: "221",
            numero: "1234567"
        }
    })

    const telefonoId = JSON.parse(telefonosRes.payload).id;

    const postRes = await app.inject({
        url: '/usuarios/',
        method: 'POST',
        payload: {
            nombre: "Juan",
            apellido: "Perez",
            fechanac: "2020-01-01",
            telefonoid: telefonoId,
            direccionid: direccionId
        }
    });
    const updatableUser = JSON.parse(postRes.payload);
    const updatableUserId = updatableUser.id;
    const res = await app.inject({
        url: `/usuarios/${updatableUserId}`,
        method: 'PUT',
        payload: {
            id: updatableUserId,
            nombre: "AHORA NO SOY JUAN",
            apellido: "NI PEREZ",
            fechanac: "2020-01-01",
            telefonoid: telefonoId,
            direccionid: direccionId
        }
    })
    t.teardown(async () => {
        await normalize.rollback();
    })
    t.equal(res.statusCode, 200);
});

test("PUT a usuarios, mismatch de ids de body/param", async (t)=> {
    const app = await build(t);
    await normalize.begin();

    const direccionesRes = await app.inject({
        url: '/direcciones',
        method: 'POST',
        payload: {
            pais: "Argentina",
            estado: "Buenos Aires",
            ciudad: "La Plata",
            calle: "Calle de prueba",
            numero: 123
        }
    })

    const direccionId = JSON.parse(direccionesRes.payload).id;

    const telefonosRes = await app.inject({
        url: '/telefonos',
        method: 'POST',
        payload: {
            codpais: "54",
            codarea: "221",
            numero: "1234567"
        }
    })

    const telefonoId = JSON.parse(telefonosRes.payload).id;

    const postRes = await app.inject({
        url: '/usuarios/',
        method: 'POST',
        payload: {
            nombre: "Juan",
            apellido: "Perez",
            fechanac: "2020-01-01",
            telefonoid: telefonoId,
            direccionid: direccionId
        }
    });
    const updatableUser = JSON.parse(postRes.payload);
    const updatableUserId = updatableUser.id;
    const res = await app.inject({
        url: `/usuarios/${updatableUserId}`,
        method: 'PUT',
        payload: {
            id: updatableUserId+1,
            nombre: "AHORA NO SOY JUAN",
            apellido: "NI PEREZ",
            fechanac: "2020-01-01",
            telefonoid: telefonoId,
            direccionid: direccionId
        }
    })
    t.teardown(async () => {
        await normalize.rollback();
    })
    t.equal(res.statusCode, 409);
});

test("PUT a usuarios, tira 500 por no poder actualizar", async (t)=> {
    const app = await build(t);
    await normalize.begin();

    const direccionesRes = await app.inject({
        url: '/direcciones',
        method: 'POST',
        payload: {
            pais: "Argentina",
            estado: "Buenos Aires",
            ciudad: "La Plata",
            calle: "Calle de prueba",
            numero: 123
        }
    })

    const direccionId = JSON.parse(direccionesRes.payload).id;

    const telefonosRes = await app.inject({
        url: '/telefonos',
        method: 'POST',
        payload: {
            codpais: "54",
            codarea: "221",
            numero: "1234567"
        }
    })

    const telefonoId = JSON.parse(telefonosRes.payload).id;

    const postRes = await app.inject({
        url: '/usuarios/',
        method: 'POST',
        payload: {
            nombre: "Juan",
            apellido: "Perez",
            fechanac: "2020-01-01",
            telefonoid: telefonoId,
            direccionid: direccionId
        }
    });
    const updatableUser = JSON.parse(postRes.payload);
    const updatableUserId = updatableUser.id;
    const res = await app.inject({
        url: `/usuarios/${updatableUserId}`,
        method: 'PUT',
        payload: {
            id: updatableUserId,
            nombre: "AHORA NO SOY JUAN",
            apellido: "NI PEREZ",
            fechanac: "2020-01-01",
            telefonoid: telefonoId+100,
            direccionid: direccionId+100
        }
    })
    t.teardown(async () => {
        await normalize.rollback();
    })
    t.equal(res.statusCode, 500);
});

test("DELETE a usuarios, funcionando", async (t)=> {
    const app = await build(t);
    await normalize.begin();

    const direccionesRes = await app.inject({
        url: '/direcciones',
        method: 'POST',
        payload: {
            pais: "Argentina",
            estado: "Buenos Aires",
            ciudad: "La Plata",
            calle: "Calle de prueba",
            numero: 123
        }
    })

    const direccionId = JSON.parse(direccionesRes.payload).id;

    const telefonosRes = await app.inject({
        url: '/telefonos',
        method: 'POST',
        payload: {
            codpais: "54",
            codarea: "221",
            numero: "1234567"
        }
    })

    const telefonoId = JSON.parse(telefonosRes.payload).id;

    const postRes = await app.inject({
        url: '/usuarios/',
        method: 'POST',
        payload: {
            nombre: "Juan",
            apellido: "Perez",
            fechanac: "2020-01-01",
            telefonoid: telefonoId, 
            direccionid: direccionId
        }
    });
    const updatableUser = JSON.parse(postRes.payload);
    const updatableUserId = updatableUser.id;
    const res = await app.inject({
        url: `/usuarios/${updatableUserId}`,
        method: 'DELETE',
    })
    t.teardown(async () => {
        await normalize.rollback();
    })
    t.equal(res.statusCode, 200);
});

test("DELETE a usuarios, tira 500", async (t)=> {
    const app = await build(t);
    await normalize.begin();

    const direccionesRes = await app.inject({
        url: '/direcciones',
        method: 'POST',
        payload: {
            pais: "Argentina",
            estado: "Buenos Aires",
            ciudad: "La Plata",
            calle: "Calle de prueba",
            numero: 123
        }
    })

    const direccionId = JSON.parse(direccionesRes.payload).id;

    const telefonosRes = await app.inject({
        url: '/telefonos',
        method: 'POST',
        payload: {
            codpais: "54",
            codarea: "221",
            numero: "1234567"
        }
    })

    const telefonoId = JSON.parse(telefonosRes.payload).id;

    const postRes = await app.inject({
        url: '/usuarios/',
        method: 'POST',
        payload: {
            nombre: "Juan",
            apellido: "Perez",
            fechanac: "2020-01-01",
            telefonoid: telefonoId,
            direccionid: direccionId
        }
    });
    const updatableUser = JSON.parse(postRes.payload);
    const updatableUserId = updatableUser.id;
    const res = await app.inject({
        url: `/usuarios/`,
        method: 'DELETE',
    })
    t.teardown(async () => {
        await normalize.rollback();
    })
    t.equal(res.statusCode, 500);
});

test("DELETE a usuarios, usuario no existe", async (t)=> {
    const app = await build(t);
    await normalize.begin();

    const direccionesRes = await app.inject({
        url: '/direcciones',
        method: 'POST',
        payload: {
            pais: "Argentina",
            estado: "Buenos Aires",
            ciudad: "La Plata",
            calle: "Calle de prueba",
            numero: 123
        }
    })

    const direccionId = JSON.parse(direccionesRes.payload).id;

    const telefonosRes = await app.inject({
        url: '/telefonos',
        method: 'POST',
        payload: {
            codpais: "54",
            codarea: "221",
            numero: "1234567"
        }
    })

    const telefonoId = JSON.parse(telefonosRes.payload).id;

    const postRes = await app.inject({
        url: '/usuarios/',
        method: 'POST',
        payload: {
            nombre: "Juan",
            apellido: "Perez",
            fechanac: "2020-01-01",
            telefonoid: telefonoId,
            direccionid: direccionId
        }
    });
    const updatableUser = JSON.parse(postRes.payload);
    const updatableUserId = updatableUser.id;
    const res = await app.inject({
        url: `/usuarios/${updatableUserId+1}`,
        method: 'DELETE',
    })
    t.teardown(async () => {
        await normalize.rollback();
    })
    t.equal(res.statusCode, 404);
});