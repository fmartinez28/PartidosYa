import { test } from 'tap';
import { build } from '../../helper.js';

test("GET de todos los usuarios", async (t) => {
    const app = await build(t);
<<<<<<< HEAD
    
=======

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
>>>>>>> d25a7f8b75ed913a8053fbcd7c39a571f4c89a65
    const res = await app.inject({
        url: '/usuarios',
        method: 'GET'
    });
    t.equal(res.statusCode, 200);
})

test("GET de un solo usuario", async (t) => {
    const app = await build(t);

<<<<<<< HEAD
=======
    const expected =
    {
        id: 1,
        nombre: 'Stego',
        apellido: 'Saurus',
        telefonoid: 1,
        direccionid: 1,
        fechanac: '1970-10-01'
    };
>>>>>>> d25a7f8b75ed913a8053fbcd7c39a571f4c89a65
    const res = await app.inject({
        url: '/usuarios/1',
        method: 'GET'
    });
    t.equal(res.statusCode, 200);
});

test("GET de un solo usuario que no existe", async (t)=> {
    const app = await build(t);

    const res = await app.inject({
        url: '/usuarios/0',
        method: 'GET'
    });
    t.equal(res.statusCode, 404);
});