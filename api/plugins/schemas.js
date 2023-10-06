import fp from 'fastify-plugin';
import * as schemas from '../schemas/generic/root.js';

export default fp(async (fastify) => {
    const keys = Object.keys(schemas);
    for (const key of keys){
        fastify.addSchema(schemas[key]);
    }
});
