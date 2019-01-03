export class Datos {
    public presion: number;
    public flujo: number;
    public nivel: number;
    constructor(
        presion?: number,
        flujo?: number,
        nivel?: number
    ) {
        nivel ? this.nivel = nivel : this.nivel = null;
        presion ? this.presion = presion : this.presion = null;
        flujo ? this.flujo = flujo : this.flujo = null;
    }
}
