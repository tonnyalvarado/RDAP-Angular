/* ******************************************************************
* Nombre de autor: Nexcode
* Fecha de creación: 09 de junio del 2017
*
* Descripción: Servicio de login y logout
*********************************************************************/
import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { environment } from '../../environments/environment';
import { User } from '../modelos/user';
import { Observable } from 'rxjs/Rx';
@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  headers: Headers;
  options: RequestOptions;
  constructor(private http: Http) {
    this.headers = new Headers({
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    });
    this.options = new RequestOptions({ headers: this.headers });
  }
  login(username: String, password: String) {
    const bodyString = {
      'nick': username,
      'password': password
    };
    const user: User = new User(null, null, null, username, password);
    return this.http.post(environment.APIURL + '/login', user, this.options)
      .map((res: Response) => res.json())
      .catch(r => Observable.throw(r._body));
  }
  logout() {
    sessionStorage.removeItem('currentUser');
    sessionStorage.removeItem('auth');
  }
}
