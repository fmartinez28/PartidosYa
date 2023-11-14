export interface IPartido {
    id: number;
    canchaId: number;
    comunidadId: number;
    fechaCreacion: string;
    fechaProgramada: string;
    playerscount?: number;
    playerslimit?: number;
}
