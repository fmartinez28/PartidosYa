import { test } from 'tap';
import { build } from '../../helper.js';
import { query } from '../../../db/index.js';
import * as normalize from '../../../utils/dbNormalization.js';
import { purge } from '../../../utils/dbPurge.js';

test("GET de todas las comunidades", async (t) => {
    const app = await build(t);

    const res = await app.inject({
        url: '/comunidades',
        method: 'GET'
    });

    t.equal(res.statusCode, 200);
})

test("GET de todas las comunidades cuando no hay comunidades", async (t) => {
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

test("POST de una comunidad", async (t) => {
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

test("PUT de una comunidad, funciona", async (t) => {
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

test("PUT de una comunidad, ids no coinciden en body/param", async (t) => {
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
            id: id + 1,
            nombre: 'ComunidadDePruebaCAMBIADA'
        }
    })
    t.teardown(async () => {
        await normalize.rollback();
    });

    t.equal(putRes.statusCode, 409);
})

test("PUT de una comunidad, comunidad no encontrada", async (t) => {
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
        url: `/comunidades/${id + 1}`,
        method: 'PUT',
        payload: {
            id: id + 1,
            nombre: 'ComunidadDePruebaCAMBIADA'
        }
    })
    t.teardown(async () => {
        await normalize.rollback();
    });

    t.equal(putRes.statusCode, 404);
})
test("DELETE de una comunidad, funciona", async (t) => {
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
test("DELETE de una comunidad, comunidad no encontrada", async (t) => {
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
        url: `/comunidades/${id + 1}`,
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

test("POST jugador a comunidad, funciona", async (t) => {
    const app = await build(t);
    normalize.begin();
    //Creo un jugador
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
    //Creo una comunidad
    const comunidadRes = await app.inject({
        url: '/comunidades',
        method: 'POST',
        payload: {
            nombre: 'ComunidadDePruebaParaJugadores'
        }
    });
    const comunidadId = JSON.parse(comunidadRes.payload).id;

    //Agrego el jugador a la comunidad
    const res = await app.inject({
        url: `/comunidades/${comunidadId}/jugadores`,
        payload: {
            jugadorid: jugadorId
        },
        method: 'POST'
    });
    t.teardown(async () => {
        await normalize.rollback();
    })
    t.equal(res.statusCode, 201);
})

test("GET de todos los jugadores de una comunidad, funciona", async (t) => {
    const app = await build(t);
    normalize.begin();
    //Creo un jugador
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
    //Creo una comunidad
    const comunidadRes = await app.inject({
        url: '/comunidades',
        method: 'POST',
        payload: {
            nombre: 'ComunidadDePruebaParaJugadores'
        }
    });
    const comunidadId = JSON.parse(comunidadRes.payload).id;

    //Agrego el jugador a la comunidad
    await app.inject({
        url: `/comunidades/${comunidadId}/jugadores`,
        payload: {
            jugadorid: jugadorId
        },
        method: 'POST'
    });
    const res = await app.inject({
        url: `/comunidades/${comunidadId}/jugadores`,
        method: 'GET'
    })
    t.teardown(async () => {
        await normalize.rollback();
    })
    t.equal(res.statusCode, 200);
})
test("GET de todos los jugadores de una comunidad, no hay jugadores", async (t) => {
    const app = await build(t);
    normalize.begin();
    const comunidadRes = await app.inject({
        url: '/comunidades',
        method: 'POST',
        payload: {
            nombre: 'ComunidadDePruebaParaJugadores'
        }
    })
    const comunidadId = JSON.parse(comunidadRes.payload).id;

    const res = await app.inject({
        url: `/comunidades/${comunidadId}/jugadores`,
        method: 'GET'
    })
    t.teardown(async () => {
        await normalize.rollback();
    })
    t.equal(res.statusCode, 204);
})

test("DELETE de un jugador de una comunidad, funciona", async (t) => {
    const app = await build(t);
    normalize.begin();
    //Creo un jugador
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
    //Creo una comunidad
    const comunidadRes = await app.inject({
        url: '/comunidades',
        method: 'POST',
        payload: {
            nombre: 'ComunidadDePruebaParaJugadores'
        }
    });
    const comunidadId = JSON.parse(comunidadRes.payload).id;

    //Agrego el jugador a la comunidad
    await app.inject({
        url: `/comunidades/${comunidadId}/jugadores`,
        payload: {
            jugadorid: jugadorId
        },
        method: 'POST'
    });

    const res = await app.inject({
        url: `/comunidades/${comunidadId}/jugadores/${jugadorId}`,
        method: 'DELETE'
    })

    t.teardown(async () => {
        await normalize.rollback();
    })
    t.equal(res.statusCode, 204);
})