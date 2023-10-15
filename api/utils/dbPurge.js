import { query } from "../db/index.js";

const tableQs = {
    "comunidadJugador": "DELETE FROM comunidadjugador;",
    "participacionPartido": "DELETE FROM participacionpartido;",
    "partido": "DELETE FROM partido;",
    "canchas": "DELETE FROM canchas;",
    "comunidades": "DELETE FROM comunidades;",
    "propietarios": "DELETE FROM propietarios;",
    "jugadores": "DELETE FROM jugadores;",
    "usuarios": "DELETE FROM usuarios;",
    "telefonos": "DELETE FROM telefonos;",
    "direcciones": "DELETE FROM direcciones;",
}
const purge = async (upTo) => {
    let finalQuery = "";
    for (const table in tableQs){
        finalQuery += tableQs[table] + "\n";
        if (table === upTo) break;
    }
    await query(finalQuery, []);
}

export {
    purge
}