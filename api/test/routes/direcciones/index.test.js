import { test } from 'tap';
import { build } from '../../helper.js';

test("GET de todas las direcciones", async (t) => {
    const app = await build(t);

    const res = await app.inject({
        url: '/direcciones',
        method: 'GET'
    });

    t.equal(res.statusCode, 200);
})

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