import { test } from 'tap';
import { build } from '../../helper.js';
import { query } from '../../../db/index.js';
import * as normalize from '../../../utils/dbNormalization.js';
import { purge } from '../../../utils/dbPurge.js';

test("GET de todas las comunidades", async (t)=> {
    const app = await build(t);
    
    const res = await app.inject({
        url: '/comunidades',
        method: 'GET'
    });

    t.equal(res.statusCode, 200);
})

test("GET de todas las comunidades cuando no hay comunidades", async (t)=> {
    const app = await build(t);
    await normalize.begin();
    
    await purge('comunidades');

    const res = await app.inject({
        url: '/comunidades',
        method: 'GET'
    });
    t.teardown(async () => {
        await normalize.rollback();
    })
    t.equal(res.statusCode, 204);
})

test("GET de una comunidad", async (t)=> {
    const app = await build(t);

    const res = await app.inject({
        url: '/comunidades/1',
        method: 'GET'
    });
    
    t.equal(res.statusCode, 200);
})

test("GET de una comunidad que no existe", async (t)=> {
    const app = await build(t);

    const res = await app.inject({
        url: '/comunidades/0',
        method: 'GET'
    });

    t.equal(res.statusCode, 404);
})
