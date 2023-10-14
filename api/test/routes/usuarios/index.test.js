import { test } from 'tap';
import { build } from '../../helper.js';

test("GET de todos los usuarios", async (t) => {
    const app = await build(t);

    const expected = [
        {
            id: 1,
            nombre: 'Stego',
            apellido: 'Saurus',
            telefonoid: 1,
            direccionid: 1,
            fechanac: '1970-10-01'
        },
        {
            id: 2,
            nombre: 'Tyranno',
            apellido: 'Saurus',
            telefonoid: 1,
            direccionid: 1,
            fechanac: '1960-11-10'
        }
    ];
    const res = await app.inject({
        url: '/usuarios',
        method: 'GET'
    });

    t.equal(res.payload, JSON.stringify(expected));
})

test("GET de un solo usuario", async (t) => {
    const app = await build(t);

    const expected =
    {
        id: 1,
        nombre: 'Stego',
        apellido: 'Saurus',
        telefonoid: 1,
        direccionid: 1,
        fechanac: '1970-10-01'
    };
    const res = await app.inject({
        url: '/usuarios/1',
        method: 'GET'
    });

    t.equal(res.payload, JSON.stringify(expected));
});