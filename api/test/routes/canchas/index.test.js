import { test } from 'tap';
import { build } from '../../helper.js';
import { begin, rollback } from '../../../utils/dbNormalization.js';

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

test("POST de una cancha funciona", async (t) => {
    await begin();
    const app = await build(t);

    const direccionRes = await app.inject({
        url: '/direcciones',
        method: 'POST',
        payload: {
            pais: "Argentina",
            estado: "Buenos Aires",
            ciudad: "La Plata",
            calle: "Calle de prueba",
            numero: 123
        }
    })

    const direccionId = JSON.parse(direccionRes.payload).id;

    const telefonoRes = await app.inject({
        url: '/telefonos',
        method: 'POST',
        payload: {
            codpais: "54",
            codarea: "221",
            numero: "1234567"
        }
    })

    const telefonoId = JSON.parse(telefonoRes.payload).id;

    const usuarioRes = await app.inject({
        url: '/usuarios',
        method: 'POST',
        payload: {
            nombre: "Usuario de prueba",
            apellido: "Apellido de prueba",
            fechanac: "2020-01-01",
            telefonoid: telefonoId,
            direccionid: direccionId
        }
    })

    const usuarioId = JSON.parse(usuarioRes.payload).id;

    app.inject({
        url: '/propietarios',
        method: 'POST',
        payload: {
            usuarioid: usuarioId
        }
    })

    const res = await app.inject({
        url: '/canchas',
        method: 'POST',
        payload: {
            nombre: "Cancha de prueba",
            direccionid: direccionId,
            canchanum: 1,
            propietarioid: usuarioId
        }
    });

    t.teardown(async () => {
        await rollback();
    })

    t.equal(res.statusCode, 201);
});

test("POST de una cancha sin nombre y con malos ids no funciona", async (t) => {
    const app = await build(t);
    await begin();
    const res = await app.inject({
        url: '/canchas',
        method: 'POST',
        payload: {
            direccionid: 1,
            canchanum: 1,
            propietarioid: 1
        }
    });

    t.teardown(async () => {
        await rollback();
    });

    t.equal(res.statusCode, 400);
});


test("PUT de una cancha funciona", async (t) => {
    const app = await build(t);
    await begin();

    const direccionRes = await app.inject({
        url: '/direcciones',
        method: 'POST',
        payload: {
            pais: "Argentina",
            estado: "Buenos Aires",
            ciudad: "La Plata",
            calle: "Calle de prueba",
            numero: 123
        }
    })

    const direccionId = JSON.parse(direccionRes.payload).id;

    const telefonoRes = await app.inject({
        url: '/telefonos',
        method: 'POST',
        payload: {
            codpais: "54",
            codarea: "221",
            numero: "1234567"
        }
    })

    const telefonoId = JSON.parse(telefonoRes.payload).id;

    const usuarioRes = await app.inject({
        url: '/usuarios',
        method: 'POST',
        payload: {
            nombre: "Usuario de prueba",
            apellido: "Apellido de prueba",
            fechanac: "2020-01-01",
            telefonoid: telefonoId,
            direccionid: direccionId
        }
    })

    const usuarioId = JSON.parse(usuarioRes.payload).id;

    app.inject({
        url: '/propietarios',
        method: 'POST',
        payload: {
            usuarioid: usuarioId
        }
    })

    const postRes = await app.inject({
        url: '/canchas',
        method: 'POST',
        payload: {
            nombre: "Cancha de prueba",
            direccionid: direccionId,
            canchanum: 1,
            propietarioid: usuarioId
        }
    });

    const canchaId = JSON.parse(postRes.payload).id;
    
    const res = await app.inject({
        url: `/canchas/${canchaId}`,
        method: 'PUT',
        payload: {
            id: canchaId,
            nombre: "Cancha de prueba 2",
            direccionid: direccionId,
            canchanum: canchaId,
            propietarioid: usuarioId
        }
    });

    t.teardown(async () => {
        await rollback();
    });

    t.equal(res.statusCode, 200);
});

test("PUT de una cancha con id de cuerpo y parámetro diferentes no funciona", async (t) => {
    const app = await build(t);
    await begin();

    const direccionRes = await app.inject({
        url: '/direcciones',
        method: 'POST',
        payload: {
            pais: "Argentina",
            estado: "Buenos Aires",
            ciudad: "La Plata",
            calle: "Calle de prueba",
            numero: 123
        }
    })

    const direccionId = JSON.parse(direccionRes.payload).id;

    const telefonoRes = await app.inject({
        url: '/telefonos',
        method: 'POST',
        payload: {
            codpais: "54",
            codarea: "221",
            numero: "1234567"
        }
    })

    const telefonoId = JSON.parse(telefonoRes.payload).id;

    const usuarioRes = await app.inject({
        url: '/usuarios',
        method: 'POST',
        payload: {
            nombre: "Usuario de prueba",
            apellido: "Apellido de prueba",
            fechanac: "2020-01-01",
            telefonoid: telefonoId,
            direccionid: direccionId
        }
    })

    const usuarioId = JSON.parse(usuarioRes.payload).id;

    app.inject({
        url: '/propietarios',
        method: 'POST',
        payload: {
            usuarioid: usuarioId
        }
    })

    const postRes = await app.inject({
        url: '/canchas',
        method: 'POST',
        payload: {
            nombre: "Cancha de prueba",
            direccionid: direccionId,
            canchanum: 1,
            propietarioid: usuarioId
        }
    });

    const postId = JSON.parse(postRes.payload).id;
   
    const res = await app.inject({
        url: `/canchas/${postId}`,
        method: 'PUT',
        payload: {
            id: postId+1,
            nombre: "Cancha de prueba 2",
            direccionid: direccionId,
            canchanum: postId,
            propietarioid: usuarioId
        }
    });

    t.teardown(async () => {
        await rollback();
    });

    t.equal(res.statusCode, 409);
});

test("DELETE de una cancha funciona", async (t) => {
    const app = await build(t);
    await begin();

    const direccionRes = await app.inject({
        url: '/direcciones',
        method: 'POST',
        payload: {
            pais: "Argentina",
            estado: "Buenos Aires",
            ciudad: "La Plata",
            calle: "Calle de prueba",
            numero: 123
        }   
    })

    const direccionId = JSON.parse(direccionRes.payload).id;

    const telefonoRes = await app.inject({
        url: '/telefonos',
        method: 'POST',
        payload: {
            codpais: "54",
            codarea: "221",
            numero: "1234567"
        }
    })

    const telefonoId = JSON.parse(telefonoRes.payload).id;

    const usuarioRes = await app.inject({
        url: '/usuarios',
        method: 'POST',
        payload: {
            nombre: "Usuario de prueba",
            apellido: "Apellido de prueba",
            fechanac: "2020-01-01",
            telefonoid: telefonoId,
            direccionid: direccionId
        }
    })

    const usuarioId = JSON.parse(usuarioRes.payload).id;

    app.inject({
        url: '/propietarios',
        method: 'POST',
        payload: {
            usuarioid: usuarioId
        }
    })

    const postRes = await app.inject({
        url: '/canchas',
        method: 'POST',
        payload: {
            nombre: "Cancha de prueba",
            direccionid: direccionId,
            canchanum: 1,
            propietarioid: usuarioId
        }
    });

    const postId = JSON.parse(postRes.payload).id;

    const res = await app.inject({
        url: `/canchas/${postId}`,
        method: 'DELETE'
    });

    t.teardown(async () => {
        await rollback();
    });

    t.equal(res.statusCode, 200);
});
