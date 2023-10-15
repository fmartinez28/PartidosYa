import { test } from 'tap';
import { build } from '../../helper.js';
import * as normalize from '../../../utils/dbNormalization.js';
import { query } from '../../../db/index.js';

test("GET de todas las direcciones", async (t) => {
    const app = await build(t);

    const res = await app.inject({
        url: '/direcciones',
        method: 'GET'
    });

    t.equal(res.statusCode, 200);
})

test("GET de todas las direcciones, no existen registros en la base", async (t) => {
    const app = await build(t);
    await normalize.begin();
    await query('DELETE FROM "comunidadjugador"');
    await query('DELETE FROM "participacionpartido"');
    await query('DELETE FROM "partido"');
    await query('DELETE FROM "canchas"');
    await query('DELETE FROM "comunidades"');
    await query('DELETE FROM "propietarios"');
    await query('DELETE FROM "jugadores"');
    await query('DELETE FROM "usuarios"');
    await query('DELETE FROM "telefonos"');
    await query('DELETE FROM "direcciones"');
    const res = await app.inject({
        url: '/direcciones',
        method: 'GET'
    });
    t.teardown(async () => {
        await normalize.rollback();
    })
    t.equal(res.statusCode, 204);
});

test("GET de una sola direccion", async (t) => {
    const app = await build(t);

    const res = await app.inject({
        url: '/direcciones/1',
        method: 'GET'
    });

    t.equal(res.statusCode, 200);
});

test("GET de una dirección que no existe", async (t) => {
    const app = await build(t);

    const res = await app.inject({
        url: '/direcciones/0',
        method: 'GET'
    });

    t.equal(res.statusCode, 404);
});

test('POST de una dirección correcto', async (t) => {
    const app = await build(t);

    const postPayload = {
        pais: "Uruguay",
        estado: "Salto",
        ciudad: "Salto",
        calle: "Uruguay",
        numero: 911
    };

    const res = await app.inject({
        url: '/direcciones/',
        method: 'POST',
        payload: postPayload
    });

    t.equal(res.statusCode, 200);
});

test('POST de una dirección incorrecto, no se manda el pais', async (t) => {
    const app = await build(t);

    const postPayload = {
        estado: 'Salto',
        ciudad: 'Salto',
        call: 'Uruguay',
        numero: 911
    };

    const res = await app.inject({
        url: '/direcciones/',
        method: 'POST',
        payload: postPayload
    });

    t.equal(res.statusCode, 400);
});

test('PUT de una dirección correcto', async (t) => {
    const app = await build(t);
    await normalize.begin();

    const postRes = await app.inject({
        url: '/direcciones/',
        method: 'POST',
        postPayload: {
            estado: 'Salto',
            ciudad: 'Salto',
            call: 'Uruguay',
            numero: 911
        }
    });
    const updatableUser = JSON.parse(postRes.payload);
    const updatableUserId = updatableUser.id;
    const res = await app.inject({
        url: `/direcciones/${updatableUserId}`,
        method: 'PUT',
        putPayload: {
            id: 1,
            pais: "Uruguay",
            estado: "Salto",
            ciudad: "Constitucion",
            calle: "Uruguay",
            numero: 123
        }
    });
    t.teardown(async () => {
        await normalize.rollback();
    });
    t.equal(res.statusCode, 200);
});

test('PUT de una dirección incorrecto, no coinciden id de url y el body', async (t) => {
    const app = await build(t);

    const putPayload = {
        id: 1,
        pais: "Uruguay",
        estado: "Salto",
        ciudad: "Salto",
        calle: "Uruguay",
        numero: 123
    };

    const res = await app.inject({
        url: '/direcciones/2',
        method: 'PUT',
        payload: putPayload
    });

    t.equal(res.statusCode, 409);
});

test('PUT de una dirección incorrecto, no existe la direccion', async (t) => {
    const app = await build(t);

    const putPayload = {
        id: 0,
        pais: "Uruguay",
        estado: "Salto",
        ciudad: "Salto",
        calle: "Uruguay",
        numero: 123
    };

    const res = await app.inject({
        url: '/direcciones/0',
        method: 'PUT',
        payload: putPayload
    });

    t.equal(res.statusCode, 404);
});