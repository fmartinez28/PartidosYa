import { test } from 'tap';
import { build } from '../../helper.js';

test("GET de todos los telefonos", async (t) => {
    const app = await build(t);

    const res = await app.inject({
        url: '/telefonos',
        method: 'GET'
    });

    t.equal(res.statusCode, 200);
})

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