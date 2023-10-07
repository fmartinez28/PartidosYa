# PartidosYa

## Ejecutar
Para ejecutar /api se debe hacer `CD` a la carpeta y correr `npm run dev`.
Se necesita disponer de un archivo .env en la carpeta /api que tenga el siguiente formato:

```
DB_USER = [el usuario de la base de datos]
DB_PASSWORD = [la contraseña de la base de datos]
DB_DATABASE = [el nombre de la base de datos]
DB_PORT = [el puerto de la base de datos]
DB_HOST = [el host de la base de datos]
```

## Ver documentación
Para ver la documentación se debe ejecutar el programa en /api y acceder a la URL `/docs` del server que se muestre en la terminal (por defecto [http://127.0.0.1:9000/docs](http://127.0.0.1:9000/docs)).
Alternativamente, también se puede optar por ver el diseño por modelo de entidades de la base de datos en el directorio design.
```

## Base de datos
El diagrama de la misma se encuentra en design/db dentro del repositorio
```