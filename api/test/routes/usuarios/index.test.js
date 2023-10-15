import { test } from 'tap';
import { build } from '../../helper.js';

test("GET de todos los usuarios", async (t) => {
    const app = await build(t);
    
    const res = await app.inject({
        url: '/usuarios',
        method: 'GET'
    });
    t.equal(res.statusCode, 200);
})

test("GET de un solo usuario", async (t) => {
    const app = await build(t);

    const res = await app.inject({
        url: '/usuarios/1',
        method: 'GET'
    });
    t.equal(res.statusCode, 200);
});

test("GET de un solo usuario que no existe", async (t) => {
    const app = await build(t);

    const res = await app.inject({
        url: '/usuarios/0',
        method: 'GET'
    });
    t.equal(res.statusCode, 404);
});