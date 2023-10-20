import { query } from '../db/index.js';

const begin = async () => {
    //console.log('ACA COMENZABA LA TRANSACCION, PERO YA NO');
}

const rollback = async () => {
    //console.log('ESTO ERA UN ROLLBACK, PERO YA NO');
}

export {
    begin,
    rollback
}