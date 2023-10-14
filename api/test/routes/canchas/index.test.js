import { test } from 'tap';
import { build } from '../../helper.js';

test("GET de todas las canchas", async (t) => {
    const app = await build(t);

    const res = await app.inject({
        url: '/canchas',
        method: 'GET'
    });

    t.equal(res.statusCode, 200);
})

test("GET de una solo canchas", async (t) => {
    const app = await build(t);

    const res = await app.inject({
        url: '/canchas/1',
        method: 'GET'
    });

    t.equal(res.statusCode, 200);
});

test("GET de una cancha que no existe", async (t) => {
    const app = await build(t);

    const res = await app.inject({
        url: '/canchas/0',
        method: 'GET'
    });

    t.equal(res.statusCode, 404);
});