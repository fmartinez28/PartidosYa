import { test } from 'tap';
import { build } from '../../helper.js';
import { query } from '../../../db/index.js';
import * as normalize from '../../../utils/dbNormalization.js';
import { purge } from '../../../utils/dbPurge.js';

test("GET de todos los partidos, no hay partidos", async (t) => {
    const app = await build(t);
    await normalize.begin();

    await purge();
    
    const res = await app.inject({
        url: '/partidos',
        method: 'GET'
    });
    t.teardown(async () => {
        await normalize.rollback();
    })
    t.equal(res.statusCode, 204);
})
test("GET de todos los partidos", async (t) => {
    const app = await build(t);
    await normalize.begin();

    const created = await query('INSERT INTO "partido" ("canchaid", "fechacreacion", "fechaprogramada", "comunidadid") VALUES ($1, $2, $3, $4) RETURNING *;', [1, '2020-01-01', '2020-01-01', 1]);
    const createdResId = created.rows[0].id;

    const res = await app.inject({
        url: '/partidos',
        method: 'GET'
    });

    t.teardown(async () => {
        await normalize.rollback();
    })
    t.equal(res.statusCode, 200);
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

test(("POST de un partido, funciona"), async(t)=> {
    const app = await build(t);
    await normalize.begin();

    const direccionRes = await app.inject({
        url: '/direcciones/',
        method: 'POST',
        payload: {
            pais: "Uruguay",
            estado: "Salto",
            ciudad: "Salto",
            calle: "Uruguay",
            numero: 911
        }
    });
    const direccionId = JSON.parse(direccionRes.payload).id;

    const usuarioRes = await app.inject({
        url: '/usuarios/',
        method: 'POST',
        payload: {
            nombre: "Juan",
            apellido: "Perez",
            fechanac: "2020-01-01",
            telefonoid: 1,
            direccionid: direccionId
        }
    })
    const usuarioId = JSON.parse(usuarioRes.payload).id;

    const propietarioRes = await app.inject({
        url: `/propietarios/`,
        method: 'POST',
        payload: {
            usuarioid: usuarioId
        }
    });

    const propietarioId = JSON.parse(propietarioRes.payload).usuarioid;
    //console.log(propietarioId);
    const comunidadRes = await app.inject({
        url: '/comunidades/',
        method: 'POST',
        payload: {
            nombre: 'ComunidadDePrueba'
        }
    });
    const comunidadId = JSON.parse(comunidadRes.payload).id;

    const canchaRes = await app.inject({
        url: `/canchas/`,
        method: 'POST',
        payload: {
            nombre: 'cancha',
            direccionid: direccionId,
            canchanum: 1,
            propietarioid: propietarioId
        }
    });
    const canchaId = JSON.parse(canchaRes.payload).id;
    const res = await app.inject({
        url: `/partidos/`,
        method: 'POST',
        payload: {
            canchaid: canchaId,
            fechacreacion: '2020-01-01',
            fechaprogramada: '2020-01-02',
            comunidadid: comunidadId
        }
    });
    t.teardown(async () => {
        await normalize.rollback();
    })

    t.equal(res.statusCode, 201);
})

test(("POST de un partido, NO valido"), async(t)=> {
    const app = await build(t);
    await normalize.begin();

    const direccionRes = await app.inject({
        url: '/direcciones/',
        method: 'POST',
        payload: {
            pais: "Uruguay",
            estado: "Salto",
            ciudad: "Salto",
            calle: "Uruguay",
            numero: 911
        }
    });
    const direccionId = JSON.parse(direccionRes.payload).id;

    const usuarioRes = await app.inject({
        url: '/usuarios/',
        method: 'POST',
        payload: {
            nombre: "Juan",
            apellido: "Perez",
            fechanac: "2020-01-01",
            telefonoid: 1,
            direccionid: direccionId
        }
    })
    const usuarioId = JSON.parse(usuarioRes.payload).id;

    const propietarioRes = await app.inject({
        url: `/propietarios/`,
        method: 'POST',
        payload: {
            usuarioid: usuarioId
        }
    });
    const propietarioId = JSON.parse(propietarioRes.payload).id;

    const comunidadRes = await app.inject({
        url: '/comunidades/',
        method: 'POST',
        payload: {
            nombre: 'ComunidadDePrueba'
        }
    });
    const comunidadId = JSON.parse(comunidadRes.payload).id;

    const canchaRes = await app.inject({
        url: `/canchas/`,
        method: 'POST',
        payload: {
            nombre: 'cancha',
            direccionid: direccionId,
            canchanum: 1,
            propietarioid: propietarioId
        }
    });
    const canchaId = JSON.parse(canchaRes.payload).id;

    const res = await app.inject({
        url: `/partidos/`,
        method: 'POST',
        payload: {
            canchaid: 1,
            fechacreacion: '2020-01-01',
            fechaprogramada: '2020-01-02',
            comunidadid: 1
        }
    });
    t.teardown(async () => {
        await normalize.rollback();
    })

    t.equal(res.statusCode, 201);
})