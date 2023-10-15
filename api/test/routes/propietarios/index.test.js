import { test } from 'tap';
import { build } from '../../helper.js';
import { begin, rollback } from '../../../utils/dbNormalization.js';

test("GET de todos los propietarios", async (t) => {
    const app = await build(t);

    const res = await app.inject({
        url: '/propietarios',
        method: 'GET'
    });

    t.equal(res.statusCode, 200);
})

test("GET de un solo propietarios", async (t) => {
    const app = await build(t);

    const res = await app.inject({
        url: '/propietarios/1',
        method: 'GET'
    });

    t.equal(res.statusCode, 200);
});

test("GET de un propietario que no existe", async (t) => {
    const app = await build(t);

    const res = await app.inject({
        url: '/propietarios/0',
        method: 'GET'
    });

    t.equal(res.statusCode, 404);
});

test("POST de un propietario funciona", async (t) => {
    const app = await build(t);
    await begin();

    const direccionRes = await app.inject({
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
    const direccionId = JSON.parse(direccionRes.payload).id;

    const telefonoRes = await app.inject({
        url: '/telefonos',
        method: 'POST',
        payload: {
            codpais: "54",
            codarea: "221",
            numero: "1234567"
        }
    })
    const telefonoId = JSON.parse(telefonoRes.payload).id;

    const usuarioRes = await app.inject({
        url: '/usuarios',
        method: 'POST',
        payload: {
            nombre: "Usuario de prueba",
            apellido: "Apellido de prueba",
            fechanac: "2020-01-01",
            telefonoid: telefonoId,
            direccionid: direccionId
        }
    })
    const usuarioId = JSON.parse(usuarioRes.payload).id;

    const res = await app.inject({
        url: '/propietarios',
        method: 'POST',
        payload: {
            usuarioid: usuarioId
        }
    });

    t.teardown(async () => {
        await rollback();
    });

    t.equal(res.statusCode, 201);
});

test("POST de un propietario con un usuario que no existe", async (t) => {
    const app = await build(t);
    await begin();

    const res = await app.inject({
        url: '/propietarios',
        method: 'POST',
        payload: {
            usuarioid: 0
        }
    });

    t.teardown(async () => {
        await rollback();
    });

    t.equal(res.statusCode, 500);
});

test("DELETE de un propietario funciona", async (t) => {
    const app = await build(t);
    await begin();


    const res = await app.inject({
        url: '/jugadores',
        method: 'POST',
        payload: {
            usuarioid: 0
        }
    });

    t.teardown(async () => {
        await rollback();
    });

    t.equal(res.statusCode, 500);
});

test("DELETE de un jugador funciona", async (t) => {
    const app = await build(t);
    await begin();
    /*TODO: todo esto repetido se debería meter en algun objeto para reutilizar, a tomar en cuenta para las 
    siguientes entregas, hacemos un cleanup de todo esto para que quede más nice
    */
    const direccionRes = await app.inject({
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
    const direccionId = JSON.parse(direccionRes.payload).id;

    const telefonoRes = await app.inject({
        url: '/telefonos',
        method: 'POST',
        payload: {
            codpais: "54",
            codarea: "221",
            numero: "1234567"
        }
    })
    const telefonoId = JSON.parse(telefonoRes.payload).id;

    const usuarioRes = await app.inject({
        url: '/usuarios',
        method: 'POST',
        payload: {
            nombre: "Usuario de prueba",
            apellido: "Apellido de prueba",
            fechanac: "2020-01-01",
            telefonoid: telefonoId,
            direccionid: direccionId
        }
    })
    const usuarioId = JSON.parse(usuarioRes.payload).id;

    const propietarioRes = await app.inject({
        url: '/propietarios',
        method: 'POST',
        payload: {
            usuarioid: usuarioId
        }
    });
    const propietarioId = JSON.parse(propietarioRes.payload).usuarioid;

    const res = await app.inject({
        url: `/propietarios/${propietarioId}`,
        method: 'DELETE'
    });

    t.teardown(async () => {
        await rollback();
    });

    t.equal(res.statusCode, 200);
});
