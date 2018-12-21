import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { environment } from '../../environments/environment';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import * as Modelos from '../modelos/models';

@Injectable({
  providedIn: 'root'
})
export class CrudService {
  headers: Headers;
  options: RequestOptions;
  optionsWUser: RequestOptions;
  // Al iniciar el servicio se establecen las opciones de las solicitudes http
  constructor(private http: Http) {
    this.headers = new Headers({
      'Content-Type': 'application/json; multipart/form-data',
      'Accept': 'application/json'
    });
    this.options = new RequestOptions({ headers: this.headers });
    this.optionsWUser = new RequestOptions({ headers: this.headers });
    this.options.headers.set('Authorization', 'Basic ' + sessionStorage.getItem('auth'));
  }
  /* Funcion create
  Entrada:	Un objeto y el nombre del API
  Proceso:	Se hace una conversion a JSON del objeto enviado en el parámetro para
        convertirlo en el cuerpo del mensaje, despues se hace la solicitud http.post
        donde se envía la direccion del API, el cuerpo del mensaje y las opciones de la
        solicitud, al final se recibe la solicitud y en caso de error se hace un  catch
  Salida:		Respuesta del servidor en código http
  */
  create2(body: any, api: string) {
    const bodyString = body;
    return this.http.post(environment.APIURL + '/' + api, bodyString, this.options)
      .map((res: Response) => res.json());
  }

  create(body: any, api: string) {
    const bodyString = body;
    return this.http.post(environment.APIURL + '/' + api, bodyString, this.options)
      .map((res: Response) => res.json());
  }

  /* Funcion read
  Entrada:	Un identificador del objeto que se quiere obtener y el nombre del API
  Proceso:	Se hace uso de la solicitud http.get concatenando a la direccion del API el valor
        del id que se recibió
  Salida:		Un objeto que corresponde con el id que se recibió
  */
  read(id: any, api: string) {
    return this.http.get(environment.APIURL + '/' + api + '/' + id, this.options)
      .map((res: Response) => res.json());
  }

  load(api: string) {
    return this.http.get(environment.APIURL + '/' + api, this.options)
      .map((res: Response) => res.json());
  }

  /* Funcion update
  Entrada:	Un body con los cambios realizados, un id del objeto y el nombre del API
	Proceso:	Se hace uso de la solicitud http.put donde en el cuerpo del mensaje se envía el JSON del producto que
				se va a actualizar, se hace similar a la solicitud post pero en esta solicitud hay que concatenar al
				URI el id del producto que se desea actualizar
	Salida:		Una respuesta http
	*/
  update(body: any, id: any, api: string) {
    const bodyParaActualizar = JSON.stringify(body);
    return this.http
      .put(environment.APIURL + '/' + api + '/' + id, bodyParaActualizar, this.options)
      .map((res: Response) => res.json());
  }
  /*Funcion remove
	Entrada:	El identificador del elemento a eliminar y el nombre del API
	Proceso:	Se hace uso de la solicitud http.delete concatenando a la direccion del API el identificador
				del elemento a eliminar
	Salida:		Una respuesta http
	*/
  remove(id: any, api: string) {
    return this.http
      .delete(environment.APIURL + '/' + api + '/' + id, this.options)
      .map((res: Response) => res.json());
  }
  /*	Función: obtenerPath
		Entrada:	Ninguna
		Proceso:	Se obtiene la direccion actual de la ventana
		Salida: 	Devuelve el path de la ventana*/
  obtenerPath() {
    const URLactual = window.location;
    return URLactual + '';
  }
  /*	Función: obtenerHora
		Entrada:	Ninguna
		Proceso:	Se obtiene la fecha de la computadora y se convierte en cadena
		Salida: 	Devuelve la fecha en formato String*/
  obtenerHora() {
    const d = new Date();
    return d + '';
  }
}
