import { test } from 'tap';
import { build } from '../../helper.js';

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