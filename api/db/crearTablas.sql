DROP TABLE IF EXISTS comunidadjugador;
DROP TABLE IF EXISTS participacionpartido;
DROP TABLE IF EXISTS partido;
DROP TABLE IF EXISTS canchas;
DROP TABLE IF EXISTS comunidades;
DROP TABLE IF EXISTS propietarios;
DROP TABLE IF EXISTS jugadores;
DROP TABLE IF EXISTS usuarios;
DROP TABLE IF EXISTS telefonos;
DROP TABLE IF EXISTS direcciones;

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
	fechanac date NOT NULL,
	telefonoid int8 NOT NULL,
	direccionid int8 NOT NULL,
	CONSTRAINT usuarios_pk PRIMARY KEY (id),
	CONSTRAINT usuarios_direccionid_fkey FOREIGN KEY (direccionid) REFERENCES public.direcciones(id),
	CONSTRAINT usuarios_telefonoid_fkey FOREIGN KEY (telefonoid) REFERENCES public.telefonos(id)
);

CREATE TABLE public.jugadores (
	usuarioid int8 NOT NULL,
	CONSTRAINT jugadores_pk PRIMARY KEY (usuarioid),
	CONSTRAINT usuarios_usuarioid_fkey FOREIGN KEY (usuarioid) REFERENCES public.usuarios(id)
);

CREATE TABLE public.propietarios (
	usuarioid int8 NOT NULL,
	CONSTRAINT propietarios_pk PRIMARY KEY (usuarioid),
	CONSTRAINT usuarios_usuarioid_fkey FOREIGN KEY (usuarioid) REFERENCES public.usuarios(id)
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
	CONSTRAINT canchas_fk_1 FOREIGN KEY (propietarioid) REFERENCES public.propietarios(usuarioid)
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
	CONSTRAINT participacionpartido_fk_1 FOREIGN KEY (jugadorid) REFERENCES public.jugadores(usuarioid)
);

CREATE TABLE public.comunidadjugador (
	jugadorid int8 NOT NULL,
	comunidadid int8 NOT NULL,
	fecharegistro date NULL,
	CONSTRAINT comunidadjugador_pk PRIMARY KEY (jugadorid, comunidadid),
	CONSTRAINT comunidadjugador_fk FOREIGN KEY (jugadorid) REFERENCES public.jugadores(usuarioid),
	CONSTRAINT comunidadjugador_fk_1 FOREIGN KEY (comunidadid) REFERENCES public.comunidades(id)
);

INSERT INTO direcciones(id, pais, estado, ciudad, calle, numero) VALUES(1, 'Uruguay', 'Salto', 'Salto', 'Uruguay', '911');
INSERT INTO telefonos(id, codpais, codarea, numero) VALUES(1, '+598', '473', '911');
INSERT INTO usuarios(id, nombre, apellido, fechanac, telefonoid, direccionid) VALUES(1, 'Stego', 'Saurus', '1970-10-01', 1, 1);
INSERT INTO usuarios(id, nombre, apellido, fechanac, telefonoid, direccionid) VALUES(2, 'Tyranno', 'Saurus', '1960-11-10', 1, 1);
INSERT INTO jugadores(usuarioid) VALUES(1); 
INSERT INTO jugadores(usuarioid) VALUES(2);
INSERT INTO comunidades(id, nombre) VALUES(1, 'PruebaCom');
INSERT INTO comunidadjugador(jugadorid, comunidadid, fecharegistro) VALUES(1, 1, '2010-05-10'); 
INSERT INTO comunidadjugador(jugadorid, comunidadid, fecharegistro) VALUES(2, 1, '2012-08-02');