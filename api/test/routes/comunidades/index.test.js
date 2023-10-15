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

test("POST de una comunidad", async (t)=> {
    const app = await build(t);
    normalize.begin();

    const createdRes = await app.inject({
        url: '/comunidades/',
        method: 'POST',
        payload: {
            nombre: 'ComunidadDePrueba'
        }
    });
    
    t.teardown(async () => {
        await normalize.rollback();
    });

    t.equal(createdRes.statusCode, 201);
})

test("PUT de una comunidad, funciona", async (t)=> {
    const app = await build(t);
    normalize.begin();

    const createdRes = await app.inject({
        url: '/comunidades/',
        method: 'POST',
        payload: {
            nombre: 'ComunidadDePrueba'
        }
    });
    const id = JSON.parse(createdRes.payload).id;
    
    const putRes = await app.inject({
        url: `/comunidades/${id}`,
        method: 'PUT',
        payload: {
            id: id,
            nombre: 'ComunidadDePruebaCAMBIADA'
        }
    })
    t.teardown(async () => {
        await normalize.rollback();
    });

    t.equal(putRes.statusCode, 200);
})

test("PUT de una comunidad, ids no coinciden en body/param", async (t)=> {
    const app = await build(t);
    normalize.begin();

    const createdRes = await app.inject({
        url: '/comunidades/',
        method: 'POST',
        payload: {
            nombre: 'ComunidadDePrueba'
        }
    });
    const id = JSON.parse(createdRes.payload).id;
    
    const putRes = await app.inject({
        url: `/comunidades/${id}`,
        method: 'PUT',
        payload: {
            id: id+1,
            nombre: 'ComunidadDePruebaCAMBIADA'
        }
    })
    t.teardown(async () => {
        await normalize.rollback();
    });

    t.equal(putRes.statusCode, 409);
})

test("PUT de una comunidad, comunidad no encontrada", async (t)=> {
    const app = await build(t);
    normalize.begin();

    const createdRes = await app.inject({
        url: '/comunidades/',
        method: 'POST',
        payload: {
            nombre: 'ComunidadDePrueba'
        }
    });
    const id = JSON.parse(createdRes.payload).id;
    
    const putRes = await app.inject({
        url: `/comunidades/${id+1}`,
        method: 'PUT',
        payload: {
            id: id+1,
            nombre: 'ComunidadDePruebaCAMBIADA'
        }
    })
    t.teardown(async () => {
        await normalize.rollback();
    });

    t.equal(putRes.statusCode, 404);
})
test("DELETE de una comunidad, funciona", async (t)=> {
    const app = await build(t);
    normalize.begin();

    const createdRes = await app.inject({
        url: '/comunidades/',
        method: 'POST',
        payload: {
            nombre: 'ComunidadDePrueba'
        }
    });
    const id = JSON.parse(createdRes.payload).id;
    
    const deletedRes = await app.inject({
        url: `/comunidades/${id}`,
        method: 'DELETE',
        payload: {
            nombre: 'ComunidadDePruebaCAMBIADA'
        }
    })
    t.teardown(async () => {
        await normalize.rollback();
    });

    t.equal(deletedRes.statusCode, 200);
})
test("DELETE de una comunidad, comunidad no encontrada", async (t)=> {
    const app = await build(t);
    normalize.begin();

    const createdRes = await app.inject({
        url: '/comunidades/',
        method: 'POST',
        payload: {
            nombre: 'ComunidadDePrueba'
        }
    });
    const id = JSON.parse(createdRes.payload).id;
    
    const deletedRes = await app.inject({
        url: `/comunidades/${id+1}`,
        method: 'DELETE',
        payload: {
            nombre: 'ComunidadDePruebaCAMBIADA'
        }
    })
    t.teardown(async () => {
        await normalize.rollback();
    });

    t.equal(deletedRes.statusCode, 404);
})
