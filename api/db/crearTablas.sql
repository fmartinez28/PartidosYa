DROP TABLE IF EXISTS comunidadmoderador CASCADE;
DROP TABLE IF EXISTS comunidadjugador CASCADE;
DROP TABLE IF EXISTS participacionpartido CASCADE;
DROP TABLE IF EXISTS partido CASCADE;
DROP TABLE IF EXISTS canchas CASCADE;
DROP TABLE IF EXISTS comunidades CASCADE;
DROP TABLE IF EXISTS propietarios CASCADE;
DROP TABLE IF EXISTS jugadores CASCADE;
DROP TABLE IF EXISTS usuarios CASCADE;
DROP TABLE IF EXISTS telefonos CASCADE;
DROP TABLE IF EXISTS direcciones CASCADE;
DROP TABLE IF EXISTS roles CASCADE;
DROP EXTENSION IF EXISTS pgcrypto;

CREATE EXTENSION pgcrypto;

CREATE TABLE public.roles (
	id serial4 NOT NULL,
	nombre varchar NOT NULL,
	CONSTRAINT roles_pk PRIMARY KEY (id),
	CONSTRAINT roles_un UNIQUE (nombre)
);


CREATE TABLE public.direcciones (
	id serial4 NOT NULL,
	pais varchar NOT NULL,
	estado varchar NOT NULL,
	ciudad varchar NOT NULL,
	calle varchar NOT NULL,
	numero varchar NOT NULL,
	CONSTRAINT direcciones_pk PRIMARY KEY (id)
);

CREATE TABLE public.telefonos (
	id serial4 NOT NULL,
	codpais varchar NOT NULL,
	codarea varchar NOT NULL,
	numero varchar NOT NULL,
	CONSTRAINT telefonos_pk PRIMARY KEY (id)
);

CREATE TABLE public.usuarios (
	id serial4 NOT NULL,
	nombre varchar NOT NULL,
	apellido varchar NOT NULL,
	email varchar NOT NULL,
	username varchar NOT NULL,
	"password" text NOT NULL,
	fechanac date NOT NULL,
	telefonoid int8 NOT NULL,
	direccionid int8 NOT NULL,
	rolid int8 NOT NULL,
	CONSTRAINT usuarios_email_key UNIQUE (email),
	CONSTRAINT usuarios_pk PRIMARY KEY (id),
	CONSTRAINT usuarios_username_key UNIQUE (username),
	CONSTRAINT usuarios_direccionid_fkey FOREIGN KEY (direccionid) REFERENCES public.direcciones(id),
	CONSTRAINT usuarios_rolid_fk FOREIGN KEY (rolid) REFERENCES public.roles(id),
	CONSTRAINT usuarios_telefonoid_fkey FOREIGN KEY (telefonoid) REFERENCES public.telefonos(id)
);

CREATE TABLE public.comunidades (
	id serial4 NOT NULL,
	nombre varchar NOT NULL,
	CONSTRAINT comunidades_pk PRIMARY KEY (id)
);

CREATE TABLE public.canchas (
	id serial4 NOT NULL,
	nombre varchar NOT NULL,
	direccionid int8 NOT NULL,
	canchanum int8 NULL,
	propietarioid int8 NOT NULL,
	CONSTRAINT canchas_pk PRIMARY KEY (id),
	CONSTRAINT canchas_fk FOREIGN KEY (direccionid) REFERENCES public.direcciones(id),
	CONSTRAINT canchas_fk1 FOREIGN KEY (propietarioid) REFERENCES public.usuarios(id)
);

CREATE TABLE public.partido (
	id serial4 NOT NULL,
	canchaid int8 NOT NULL,
	fechacreacion date NOT NULL,
	fechaprogramada date NOT NULL,
	comunidadid int8 NOT NULL,
	CONSTRAINT partido_pk PRIMARY KEY (id),
	CONSTRAINT partido_fk FOREIGN KEY (canchaid) REFERENCES public.canchas(id),
	CONSTRAINT partido_fk_1 FOREIGN KEY (comunidadid) REFERENCES public.comunidades(id)
);

CREATE TABLE public.participacionpartido (
	partidoid int8 NOT NULL,
	jugadorid int8 NOT NULL,
	participacionfecha date NULL,
	CONSTRAINT participacionpartido_pk PRIMARY KEY (partidoid, jugadorid),
	CONSTRAINT participacionpartido_fk FOREIGN KEY (partidoid) REFERENCES public.partido(id),
	CONSTRAINT participacionpartido_fk_1 FOREIGN KEY (jugadorid) REFERENCES public.usuarios(id)
);

CREATE TABLE public.comunidadjugador (
	jugadorid int8 NOT NULL,
	comunidadid int8 NOT NULL,
	fecharegistro date NULL,
	CONSTRAINT comunidadjugador_pk PRIMARY KEY (jugadorid, comunidadid),
	CONSTRAINT comunidadjugador_fk FOREIGN KEY (jugadorid) REFERENCES public.usuarios(id),
	CONSTRAINT comunidadjugador_fk_1 FOREIGN KEY (comunidadid) REFERENCES public.comunidades(id)
);

CREATE TABLE public.comunidadmoderador (
	comunidadid int8 NOT NULL,
	usuarioid int8 NOT NULL,
	CONSTRAINT comunidadmoderador_fk FOREIGN KEY (comunidadid) REFERENCES public.comunidades(id),
	CONSTRAINT comunidadmoderador_fk_1 FOREIGN KEY (usuarioid) REFERENCES public.usuarios(id)
);

INSERT INTO roles(nombre) VALUES('jugador');
INSERT INTO roles(nombre) VALUES('propietario');
INSERT INTO roles(nombre) VALUES('administrador');
INSERT INTO direcciones(pais, estado, ciudad, calle, numero) VALUES('Uruguay', 'Salto', 'Salto', 'Uruguay', '911');
INSERT INTO direcciones(pais, estado, ciudad, calle, numero) VALUES('Uruguay', 'Montevideo', 'Cerro', 'Cerrito', '922');
INSERT INTO telefonos(codpais, codarea, numero) VALUES('+598', '473', '911');
INSERT INTO telefonos(codpais, codarea, numero) VALUES('+598', '473', '922');
INSERT INTO usuarios(rolid, nombre, apellido, username, fechanac, telefonoid, direccionid, email, "password") VALUES(1, 'Stego', 'Saurus', 'jugador1', '1970-10-01', 1, 1, 'alguien@example.com', crypt('admin', gen_salt('bf')));
INSERT INTO usuarios(rolid, nombre, apellido, username, fechanac, telefonoid, direccionid, email, "password") VALUES(1, 'Tyranno', 'Saurus', 'jugador2','1960-11-10', 1, 1, 'someone@example.com', crypt('admin', gen_salt('bf')));
INSERT INTO usuarios(rolid, nombre, apellido, username, fechanac, telefonoid, direccionid, email, "password") VALUES(2, 'Rico', 'McRico', 'propietario1','1960-11-10', 1, 1, 'alguien@empresa.com', crypt('admin', gen_salt('bf')));
INSERT INTO usuarios(rolid, nombre, apellido, username, fechanac, telefonoid, direccionid, email, "password") VALUES(2, 'Humilde', 'McCristiano', 'propietario2','1960-11-10', 1, 1, 'otro@empresa.com', crypt('admin', gen_salt('bf')));
INSERT INTO comunidades(id, nombre) VALUES(1, 'PruebaCom');
INSERT INTO comunidadmoderador(usuarioid, comunidadid) VALUES(1, 1);
INSERT INTO comunidadjugador(jugadorid, comunidadid, fecharegistro) VALUES(1, 1, '2010-05-10'); 
INSERT INTO comunidadjugador(jugadorid, comunidadid, fecharegistro) VALUES(2, 1, '2012-08-02');
INSERT INTO canchas(nombre, direccionid, canchanum, propietarioid) VALUES('Cancha 1', 1, 1, 3);
INSERT INTO canchas(nombre, direccionid, canchanum, propietarioid) VALUES('Cancha 2', 2, 2, 4);

