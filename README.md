# PartidosYa

## Prerrequisitos

Antes de ejecutar, es importante tener la base de datos en condiciones, para esto debe crearse la base de datos, del nombre que quiera, y ejecutar el script que se encuentra dentro de /api/db/CrearTablas.sql en la misma.

## Ejecutar

### Frontend

Para ejecutar /frontend se se debe hacer `CD` a la carpeta y correr `ng serve`.
Se necesita disponer de un archivo `/src/environments/environment.ts` que tenga el siguiente formato:

```ts
export const environment = {
    apiUrl: "http://localhost:9000",
    production: false,
}
```
Reemplazar la apiUrl por la URL en la que tenga la API.

### API

Para ejecutar /api se debe hacer `CD` a la carpeta y correr `npm run dev`.
Se necesita disponer de un archivo .env en la carpeta /api que tenga el siguiente formato:

```
DB_USER = [el usuario de la base de datos]
DB_PASSWORD = [la contraseña de la base de datos]
DB_DATABASE = [el nombre de la base de datos]
DB_PORT = [el puerto de la base de datos]
DB_HOST = [el host de la base de datos]
FASTIFY_HOST = [localhost en este caso]
FASTIFY_PORT = [puerto de la api, 9000 en este caso]
JWT_SECRET = [Secret para el plugin de jwt]
```

## Ver documentación

### Documentación REST
Para ver la documentación se debe ejecutar el programa en /api y acceder a la URL `/docs` del server que se muestre en la terminal (por defecto [http://127.0.0.1:9000/docs](http://127.0.0.1:9000/docs)).
Alternativamente, también se puede optar por ver el diseño por modelo de entidades de la base de datos en el directorio design.

### Documentación Front
La documentación del frontend se encuentra disponible en la ruta design/frontend. Los archivos .excalidraw se pueden abrir con la extensión de Visual Studio Code de [Excalidraw](https://marketplace.visualstudio.com/items?itemName=pomdtr.excalidraw-editor) o desde su versión web [https://excalidraw.com/](https://excalidraw.com/).

## Base de datos

El diagrama de la misma se encuentra en design/db dentro del repositorio

## Tests

Todos los tests se encuentran dentro del directorio /api/tests, para ejecutarlos, posicionarse en /api/ y ejecutar:
```
npm run test
```
Las transacciones efectuadas durante los tests no se verán reflejadas en la base de datos, pero es imperativo cumplir con los prerrequisitos antes de ejecutar los tests.
