import { Datos } from './datos';
import { Ubicacion } from './ubicacion';
export class Galileo {
  public _id: String;
  public nombre: String;
  public datos: Datos;
  public ubicacion: Ubicacion;
  constructor(
      _id?: String,
      nombre?: String,
      datos?: Datos,
      ubicacion?: Ubicacion,
  ) {
      _id ? this._id = _id : this._id = null;
      nombre ? this.nombre = nombre : nombre = null;
      datos ? this.datos = datos : this.datos = new Datos();
      ubicacion ? this.ubicacion = ubicacion : this.ubicacion = new Ubicacion();
  }
}
