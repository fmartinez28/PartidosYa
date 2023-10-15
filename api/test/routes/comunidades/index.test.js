import { test } from 'tap';
import { build } from '../../helper.js';

test("GET de todas las comunidades", async (t) => {
    const app = await build(t);

    const res = await app.inject({
        url: '/comunidades',
        method: 'GET'
    });
    t.equal(res.statusCode, 200);
})

test("GET de una comunidad", async (t) => {
    const app = await build(t);

    const res = await app.inject({
        url: '/comunidades/1',
        method: 'GET'
    });

    t.equal(res.statusCode, 200);
})

test("GET de una comunidad que no existe", async (t) => {
    const app = await build(t);

    const res = await app.inject({
        url: '/comunidades/0',
        method: 'GET'
    });

    t.equal(res.statusCode, 404);
})
