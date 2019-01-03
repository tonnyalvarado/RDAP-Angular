import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthenticationService } from '../services/authentication.service';
import { CrudService } from '../services/crud.service';
import * as Modelos from '../modelos/models';
import { trigger, style, animate, transition } from '@angular/animations';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  animations: [
    trigger('fadeInOut', [
      transition(':enter', [   // :enter is alias to 'void => *'
        style({ opacity: 0 }),
        animate(600, style({ opacity: 1 }))
      ]),
      transition(':leave', [   // :leave is alias to '* => void'
        animate(600, style({ opacity: 0 }))
      ])
    ])
  ],
})
export class LoginComponent implements OnInit {
  model: Modelos.User;
  modelUser: Modelos.User;
  loading = false;
  returnUrl: string;
  flagError: boolean;
  cont: number;
  mensaje: string;
  user: Modelos.User;
  idSucursal: string;
  page: number;
  confContrasena: String;
  flagSuccess: boolean;
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private auth: AuthenticationService) {

    this.cont = 0;
    this.page = 1;
    this.modelUser = new Modelos.User();
    this.model = new Modelos.User();
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
  nuevaCuenta() {
    this.page = 2;
    this.limpiarCampos();
  }
  limpiarCampos() {
    this.flagError = false;
    this.modelUser = new Modelos.User();
    this.model = new Modelos.User();
    this.confContrasena = null;
    this.flagSuccess = false;
  }
  cancelar() {
    this.page = 1;
    this.limpiarCampos();
  }
  crearUsuario() {
    if (this.validarCampos()) {
      this.mensaje = 'El Usuario se ha creado correctamente';
      this.flagSuccess = true;
      setTimeout(() => {
        this.flagSuccess = false;
      }, 2000);
    } else {
      return;
    }
  }
  validarCampos(): boolean {
    if (!this.modelUser.name || !this.modelUser.email || !this.modelUser.nick || !this.modelUser.password ||
      this.modelUser.password !== this.confContrasena) {
      this.flagError = true;
      this.modelUser.password !== this.confContrasena ? this.mensaje = 'La contraseña no coincide' :
        this.mensaje = 'Favor de llenar todos los campos';
      return false;
    } else {
      return true;
    }
  }
}
