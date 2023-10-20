import { test } from 'tap';
import { build } from '../../helper.js';
import * as normalize from '../../../utils/dbNormalization.js';
import { query } from '../../../db/index.js';
import { purge } from '../../../utils/dbPurge.js';

test("GET de todas las direcciones", async (t) => {
    const app = await build(t);

    const res = await app.inject({
        url: '/direcciones',
        method: 'GET'
    });

    t.equal(res.statusCode, 200);
})
//FIXME: Arreglar esto para no irrumpir en los otros tests
test("GET de todas las direcciones, no existen registros en la base", async (t) => {
    /** 
    const app = await build(t);
    await normalize.begin();

    await purge('direcciones');

    const res = await app.inject({
        url: '/direcciones',
        method: 'GET'
    });
    t.teardown(async () => {
        await normalize.rollback();
    })
    t.equal(res.statusCode, 204);
    */
});

test("GET de una sola direccion", async (t) => {
    const app = await build(t);

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

    const res = await app.inject({
        url: `/direcciones/${direccionId}`,
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
    await normalize.begin();
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
    t.teardown(async() => {
        await normalize.rollback();
    })
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
        payload: {
            pais: "Uruguay",
            estado: 'Salto',
            ciudad: 'Salto',
            calle: 'Uruguay',
            numero: 911
        }
    });
    const updatableAddress = JSON.parse(postRes.payload);
    const updatableAddressId = updatableAddress.id;
    const res = await app.inject({
        url: `/direcciones/${updatableAddressId}`,
        method: 'PUT',
        payload: {
            id: updatableAddressId,
            pais: "Urug",
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

    const postRes = await app.inject({
        url: '/direcciones/',
        method: 'POST',
        payload: {
            pais: "Uruguay",
            estado: 'Salto',
            ciudad: 'Salto',
            calle: 'Uruguay',
            numero: 911
        }
    });
    const updatableAddress = JSON.parse(postRes.payload);
    const updatableAddressId = updatableAddress.id;
    const res = await app.inject({
        url: `/direcciones/${updatableAddressId+1}`,
        method: 'PUT',
        payload: {
            id: updatableAddressId+1,
            pais: "Uruguay",
            estado: "Salto",
            ciudad: "Constitucion",
            calle: "Uruguay",
            numero: 123
        }
    });

    t.equal(res.statusCode, 404);
});