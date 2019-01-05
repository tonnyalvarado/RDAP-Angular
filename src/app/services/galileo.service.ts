import { Injectable, OnDestroy } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { environment } from '../../environments/environment';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { Subject, Observable } from 'rxjs';
import * as Modelos from '../modelos/models';
import { CrudService } from './crud.service';
import { Config } from '../config/config';

@Injectable({
  providedIn: 'root'
})
export class GalileoService {
  headers: Headers;
  options: RequestOptions;

  private galileos: Modelos.Galileo[] = [];
  private galileosUpdated = new Subject<Modelos.Galileo[]>();
  private timer = Observable.interval(Config.TIME).startWith(0);
  private subscriptionGalileos;
  private galileoSelected: Modelos.Galileo;
  private galileoSelectedUL = new Subject<Modelos.Galileo>();

  constructor(private http: Http, private crudService: CrudService) {
    this.headers = new Headers({
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    });
    this.options = new RequestOptions({ headers: this.headers });
    this.options.headers.set('Authorization', 'Basic ' + sessionStorage.getItem('auth'));
  }

  getGalileos() {
    if (!this.galileos[0]) {
      this.subscriptionGalileos = this.timer.subscribe(() => {
        this.crudService.load('galileo/all').subscribe(r => {
          this.galileos = [];
          r.forEach(g => {
            const gal = new Modelos.Galileo(g._id, g.nombre, g.datos[0], g.ubicacion[0]);
            this.galileos.push(gal);
          });
          this.galileosUpdated.next([...this.galileos]);
        });
      });
    }
    return [...this.galileos];

  }

  getGalileoUpdaterListener() {
    return this.galileosUpdated.asObservable();
  }

  addGalileo(galileo: Modelos.Galileo) {
    this.crudService.create(galileo, 'galileo').subscribe(g => {
      if (!g.status) {
        this.galileos.push(new Modelos.Galileo(g._id, g.nombre, g.datos[0], g.ubicacion[0]));
        this.galileosUpdated.next([...this.galileos]);
      }
    });
  }

  getGalileoSelected() {
    if (this.galileoSelected) {
      this.crudService.read(this.galileoSelected._id, 'galileo').subscribe(r => {

      });
      return this.galileoSelected;
    } else {
      return null;
    }
  }

  getGalileoSelectedUL() {
    return this.galileoSelectedUL.asObservable();
  }

  closeGalileoService() {
    this.subscriptionGalileos.unsubscribe();
  }

  updateGalileo(galileo: Modelos.Galileo) {
    let g = this.galileos.find(f => f._id === galileo._id);
    if (g) {
      g = galileo;
    }
    this.galileosUpdated.next([...this.galileos]);
  }
  deleteGalileo(galileo: Modelos.Galileo) {
    this.galileos.splice(this.galileos.indexOf(galileo), 1);
    this.galileosUpdated.next([...this.galileos]);
  }
}
