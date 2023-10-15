import { test } from 'tap';
import { build } from '../../helper.js';



test("GET de todos los jugadores", async (t)=> {
    const app = await build(t);
    
    const res = await app.inject({
        url: '/jugadores',
        method: 'GET'
    });
    t.equal(res.statusCode, 200);
})

test("GET de un solo jugador", async (t)=> {
    const app = await build(t);

    const res = await app.inject({
        url: '/jugadores/1',
        method: 'GET'
    });
    t.equal(res.statusCode, 200);
});

test("GET de un solo jugador que no existe", async (t)=> {
    const app = await build(t);

    const res = await app.inject({
        url: '/jugadores/0',
        method: 'GET'
    });
    t.equal(res.statusCode, 404);
});