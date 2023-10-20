import { test } from 'tap';
import { build } from '../../helper.js';
import { begin, rollback } from '../../../utils/dbNormalization.js';

test("GET de todos los jugadores", async (t) => {
    const app = await build(t);

    const res = await app.inject({
        url: '/jugadores',
        method: 'GET'
    });
    t.equal(res.statusCode, 200);
})

test("GET de un solo jugador", async (t) => {
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

    const jugadorRes = await app.inject({
        url: '/jugadores',
        method: 'POST',
        payload: {
            usuarioid: usuarioId
        }
    });

    const jugadorId = JSON.parse(jugadorRes.payload).usuarioid;

    const res = await app.inject({
        url: `/jugadores/${jugadorId}`,
        method: 'GET'
    });
    t.equal(res.statusCode, 200);
});

test("GET de un solo jugador que no existe", async (t) => {
    const app = await build(t);

    const res = await app.inject({
        url: '/jugadores/0',
        method: 'GET'
    });
    t.equal(res.statusCode, 404);
});

test("POST de un jugador funciona", async (t) => {
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

    const jugadorRes = await app.inject({
        url: '/jugadores',
        method: 'POST',
        payload: {
            usuarioid: usuarioId
        }
    });

    t.teardown(async () => {
        await rollback();
    });

    t.equal(jugadorRes.statusCode, 201);
});

test("POST de un jugador con un usuario que no existe", async (t) => {
    const app = await build(t);
    await begin();

    const res = await app.inject({
        url: '/jugadores',
        method: 'POST',
        payload: {
            usuarioid: 0
        }
    });

    t.teardown(async () => {
        await rollback();
    });

    t.equal(res.statusCode, 500);
});

test("DELETE de un jugador funciona", async (t) => {
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

    const jugadorRes = await app.inject({
        url: '/jugadores',
        method: 'POST',
        payload: {
            usuarioid: usuarioId
        }
    });
    const jugadorId = JSON.parse(jugadorRes.payload).usuarioid;
    const res = await app.inject({
        url: `/jugadores/${jugadorId}`,
        method: 'DELETE'
    });

    t.teardown(async () => {
        await rollback();
    });

    t.equal(res.statusCode, 200);
});