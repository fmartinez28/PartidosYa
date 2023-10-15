import { test } from 'tap';
import { build } from '../../helper.js';
import { query } from '../../../db/index.js';
import * as normalize from '../../../utils/dbNormalization.js';


test("GET de todos los partidos", async (t) => {
    const app = await build(t);

    const res = await app.inject({
        url: '/partidos',
        method: 'GET'
    });
    t.equal(res.statusCode, 204);
})


test("GET de un solo partido", async (t) => {
    const app = await build(t);
    await normalize.begin();
    const created = await query('INSERT INTO "partido" ("canchaid", "fechacreacion", "fechaprogramada", "comunidadid") VALUES ($1, $2, $3, $4) RETURNING *;', [1, '2020-01-01', '2020-01-01', 1]);
    const createdResId = created.rows[0].id;
    const res = await app.inject({
        url: `/partidos/${createdResId}`,
        method: 'GET'
    });
    t.teardown(async () => {
        await normalize.rollback();
    })
    t.equal(res.statusCode, 200);
});


test("GET de un solo partido que no existe", async (t) => {
    const app = await build(t);
    const res = await app.inject({
        url: `/partidos/0`,
        method: 'GET'
    });
    t.equal(res.statusCode, 404);
});