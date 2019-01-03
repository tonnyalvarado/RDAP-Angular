import { Component, OnInit, OnDestroy } from '@angular/core';
import * as Modelos from '../modelos/models';
import * as Servicios from '../services/services';
import { trigger, style, animate, transition } from '@angular/animations';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';
import { MatDialog } from '@angular/material';
import { ModalComponent } from '../modal/modal.component';

@Component({
  selector: 'app-principal',
  templateUrl: './principal.component.html',
  styleUrls: ['./principal.component.scss'],
  animations: [
    trigger('enterAnimation', [
      transition(':enter', [
        style({ transform: 'translateX(50%)', opacity: 0 }),
        animate('600ms', style({ transform: 'translateX(0)', opacity: 1 }))
      ]),
      transition(':leave', [
        style({ transform: 'translateX(0)', opacity: 1 }),
        animate('600ms', style({ transform: 'translateX(50%)', opacity: 0 }))
      ])
    ]
    ),
    trigger('fadeInOut', [
      transition(':enter', [   // :enter is alias to 'void => *'
        style({ opacity: 0 }),
        animate(1000, style({ opacity: 1 }))
      ]),
      transition(':leave', [   // :leave is alias to '* => void'
        animate(1000, style({ opacity: 0 }))
      ])
    ])
  ]
})
export class PrincipalComponent implements OnInit, OnDestroy {
  displayedColumns: string[] = ['_id', 'nombre', 'ubicacion', 'presion', 'flujo', 'nivel'];
  message: String;
  galileos: Modelos.Galileo[];
  galileosSub: Subscription;
  galileoSelected: Modelos.Galileo;
  constructor(private galileoService: Servicios.GalileoService, public dialog: MatDialog) {
    this.message = null;
  }

  ngOnInit() {
    this.galileos = this.galileoService.getGalileos();
    this.galileosSub = this.galileoService.getGalileoUpdaterListener().subscribe((galileos: Modelos.Galileo[]) => {
      this.galileos = galileos;
    });
  }
  ngOnDestroy() {
    this.galileosSub.unsubscribe();
    this.galileoService.closeGalileoService();
  }

  validate(form: NgForm): void {
    if (!form.value.nombre) {
      this.showAlert('Necesita asignar un nombre para continuar');
      return;
    } else if (!form.value.estado) {
      this.showAlert('Necesita asignar un estado para continuar');
      return;
    } else if (!form.value.pais) {
      this.showAlert('Necesita asignar un país para continuar');
      return;
    }
    this.createGalileo(form);
    form.reset();
  }

  createGalileo(form: NgForm): void {
    const galileo = new Modelos.Galileo(null, form.value.nombre, null,
      new Modelos.Ubicacion(form.value.calle, form.value.numero, form.value.colonia, form.value.municipio,
        form.value.estado, form.value.pais));
    this.galileoService.addGalileo(galileo);
  }
  showAlert(alert: String): void {
    this.message = alert;
    setTimeout(() => {
      this.message = null;
    }, 2000);
  }
  onRowSelect(row: Modelos.Galileo) {
    this.galileoSelected = row;
  }
  openDialog(): void {
    const dialogRef = this.dialog.open(ModalComponent, {
      width: '250px',
      data: this.galileoSelected
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }
}
