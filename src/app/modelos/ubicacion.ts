export class Ubicacion {
  public calle: String;
  public numero: String;
  public colonia: String;
  public municipio: String;
  public estado: String;
  public pais: String;
  constructor(
      calle?: String,
      numero?: String,
      colonia?: String,
      municipio?: String,
      estado?: String,
      pais?: String
  ) {
      calle ? this.calle = calle : this.calle = null;
      numero ? this.numero = numero : numero = null;
      colonia ? this.colonia = colonia : this.colonia = null;
      municipio ? this.municipio = municipio : this.municipio = null;
      estado ? this.estado = estado : this.estado = null;
      pais ? this.pais = pais : this.pais = null;
  }
}
