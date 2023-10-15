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

    await app.inject({
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

    await app.inject({
        url: '/telefonos',
        method: 'POST',
        payload: {
            codpais: "54",
            codarea: "221",
            numero: "1234567"
        }
    })

    await app.inject({
        url: '/usuarios',
        method: 'POST',
        payload: {
            nombre: "Usuario de prueba",
            apellido: "Apellido de prueba",
            fechanac: "2020-01-01",
            telefonoid: 1,
            direccionid: 1
        }
    })

    const res = await app.inject({
        url: '/propietarios',
        method: 'POST',
        payload: {
            usuarioid: 1
        }
    });

    t.teardown(async () => {
        await rollback();
    });

    t.equal(res.statusCode, 200);
});

test("POST de un propietario con un usuario que no existe", async (t) => {
    const app = await build(t);
    await begin();

    const res = await app.inject({
        url: '/propietarios',
        method: 'POST',
        payload: {
            usuarioid: -1
        }
    });

    t.teardown(async () => {
        await rollback();
    });

    t.equal(res.statusCode, 400);
});

test("DELETE de un propietario funciona", async (t) => {
    const app = await build(t);
    await begin();

    await app.inject({
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

    await app.inject({
        url: '/telefonos',
        method: 'POST',
        payload: {
            codpais: "54",
            codarea: "221",
            numero: "1234567"
        }
    })

    await app.inject({
        url: '/usuarios',
        method: 'POST',
        payload: {
            nombre: "Usuario de prueba",
            apellido: "Apellido de prueba",
            fechanac: "2020-01-01",
            telefonoid: 1,
            direccionid: 1
        }
    })

    await app.inject({
        url: '/propietarios',
        method: 'POST',
        payload: {
            usuarioid: 1
        }
    });

    const res = await app.inject({
        url: '/propietarios/1',
        method: 'DELETE'
    });

    t.teardown(async () => {
        await rollback();
    });

    t.equal(res.statusCode, 200);
});
