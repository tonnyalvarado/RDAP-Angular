import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthenticationService } from '../services/authentication.service';
import { CrudService } from '../services/crud.service';
import * as Modelos from '../modelos/models';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  model: any = {};
  loading = false;
  returnUrl: string;
  flagError: boolean;
  cont: number;
  mensaje: string;
  user: Modelos.User;
  idSucursal: string;
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private auth: AuthenticationService) {

    this.cont = 0;
  }
  ngOnInit() {
    this.auth.logout();
  }
  login() {
    this.cont++;
    this.loading = true;
    if (this.cont >= 10) {
      this.mensaje = '¡Limite de intentos agotado! contacta al administrador...';
      this.flagError = true;
      return;
    } else {
      this.auth.login(this.model.nick, this.model.password).subscribe(response => {
        this.loading = false;
        if (response.status === 200) {
          sessionStorage.setItem('currentUser', JSON.stringify(response.body));
          sessionStorage.setItem('auth', btoa(this.model.nick + ':' + this.model.password));
          this.router.navigate(['principal']);
        }
      }, (err) => {
        const response = JSON.parse(err);
        if (response.status === 404) {
          this.mensaje = 'Usuario o contraseña incorrectos...';
          this.flagError = true;
        } else if (response.status === 401) {
          this.mensaje = 'Usuario o contraseña incorrectos...';
          this.flagError = true;
        } else {
          this.loading = false;
          this.mensaje = 'No hay conexion al servidor';
          this.flagError = true;
        }
        this.loading = false;
      });
    }
  }
}
