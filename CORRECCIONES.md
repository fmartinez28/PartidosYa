Buena pinta tiene, pero... 
- Los tests no pasan. Me parece que se complicaron con los rollbacks... los tests mejor pensarlos que los ejecutas sobre una base de datos que no sabés que tiene.
- Haganlos pasar para poder corregir del todo el finde que viene. Verifiquen el jueves en clase.
- En el .env piden  FASTIFY_PORT, pero en el script está hardcodeado 9000.
- Por lo anterior no funciona la ejecución de las rutas en el swagger. Yo configuré puerto 3000 (swagger lo toma bien) y ustedes hardcodearon 9000 en el npm run dev. Bueno, no se si es por eso porque configuré 9000 y mismo resultado. Revisen.
- Háganme facil la vida y pongan un .env de ejemplo con esto: 
```
DB_USER = [el usuario de la base de datos]
DB_PASSWORD = [la contraseña de la base de datos]
DB_DATABASE = [el nombre de la base de datos]
DB_PORT = [el puerto de la base de datos]
DB_HOST = [el host de la base de datos]
FASTIFY_HOST = [localhost en este caso]
FASTIFY_PORT = [puerto de la api, 9000 en este caso]
```
- Bien desacoplados los datos de configuración
- Buena cobertura de tests, no cuesta llegar al 100%. 
- Si dejan la ruta / ponganle un esquema y description, con una respuesta más "de ustedes". 
- Ojo con esos 4XX que retornan solo message, que no se les escape uno generado por fastify con otra estructura y les termine dando 500 en vez de 404. O Modificaron la respuesta por defecto de fastify ?
- Veo que les falta especificar el esquema en los parameters. Recuerden que :
The supported validations are:

    body: validates the body of the request if it is a POST, PUT, or PATCH method.
    querystring or query: validates the query string.
    params: validates the route params.
    headers: validates the request headers.

Reviso de nuevo el finde que viene.
