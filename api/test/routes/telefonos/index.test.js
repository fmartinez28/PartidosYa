import { test } from 'tap';
import { build } from '../../helper.js';
import * as normalize from '../../../utils/dbNormalization.js';
import { query } from '../../../db/index.js';

test("GET de todos los telefonos", async (t) => {
    const app = await build(t);

    const res = await app.inject({
        url: '/telefonos',
        method: 'GET'
    });

    t.equal(res.statusCode, 200);
})

test("GET de todos los telefonos no existen registros en la base", async (t) => {
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
    const res = await app.inject({
        url: '/telefonos',
        method: 'GET'
    });
    t.teardown(async () => {
        await normalize.rollback();
    })
    t.equal(res.statusCode, 204);
});

test("GET de un solo telefono", async (t) => {
    const app = await build(t);

    const res = await app.inject({
        url: '/telefonos/1',
        method: 'GET'
    });

    t.equal(res.statusCode, 200);
});

test("GET de un telefono que no existe", async (t) => {
    const app = await build(t);

    const res = await app.inject({
        url: '/telefonos/0',
        method: 'GET'
    });

    t.equal(res.statusCode, 404);
});

test('POST de un telefono correcto', async (t) => {
    const app = await build(t);

    const postPayload = {
        codpais: '+598',
        codarea: '473',
        numero: '099123456'
    };

    const res = await app.inject({
        url: '/telefonos/',
        method: 'POST',
        payload: postPayload
    });

    t.equal(res.statusCode, 200);
});

test('POST de un telefono incorrecto, no se manda el numero', async (t) => {
    const app = await build(t);

    const postPayload = {
        codpais: '+598',
        codarea: '473'
    };

    const res = await app.inject({
        url: '/telefonos/',
        method: 'POST',
        payload: postPayload
    });

    t.equal(res.statusCode, 400);
});

test('PUT de un telefono correcto', async (t) => {
    const app = await build(t);

    const putPayload = {
        id: 1,
        codpais: '+598',
        codarea: '473',
        numero: '11111'
    };

    const res = await app.inject({
        url: '/telefonos/1',
        method: 'PUT',
        payload: putPayload
    });

    t.equal(res.statusCode, 200);
});

test('PUT de un telefono incorrecto, no coinciden id de url y el body', async (t) => {
    const app = await build(t);

    const putPayload = {
        id: 1,
        codpais: '+598',
        codarea: '473',
        numero: '11111'
    };

    const res = await app.inject({
        url: '/telefonos/2',
        method: 'PUT',
        payload: putPayload
    });

    t.equal(res.statusCode, 409);
});

test('PUT de un telefono incorrecto, no existe el telefono', async (t) => {
    const app = await build(t);

    const putPayload = {
        codpais: '+598',
        codarea: '473',
        numero: '096123456'
    };

    const res = await app.inject({
        url: '/telefonos/0',
        method: 'PUT',
        payload: putPayload
    });

    t.equal(res.statusCode, 400);
});

test('DELETE de un telefono que no existe', async (t) => {
    const app = await build(t);

    const res = await app.inject({
        url: '/telefonos/0',
        method: 'DELETE'
    });

    t.equal(res.statusCode, 404);
});


test('DELETE de un telefono que existe', async (t) => {
    const app = await build(t);

    const res = await app.inject({
        url: '/telefonos/2',
        method: 'DELETE'
    });

    t.equal(res.statusCode, 200);
});