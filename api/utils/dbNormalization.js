import { query } from '../db/index.js';

const begin = async () => {
    await query('BEGIN;');
}

const rollback = async () => {
    await query('ROLLBACK;');
}

export {
    begin,
    rollback
}