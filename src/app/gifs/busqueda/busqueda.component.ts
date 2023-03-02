import { Component, ElementRef, ViewChild } from '@angular/core';
import { GifsService } from '../services/gifs.service';

@Component({
  selector: 'app-busqueda',
  templateUrl: './busqueda.component.html',
})
export class BusquedaComponent {

   @ViewChild('txtBuscar') txtBuscar!: ElementRef<HTMLInputElement>;

   //En este punto cuando usamos un servicio al componente lo inyectamos en el constructor
   constructor(private gifsService: GifsService) {}
 
   buscar() {

    const valor = this.txtBuscar.nativeElement.value;

    // //Controlamos en guardar vacios en la busqueda
    // if(valor.trim().length === 0){
    //   return;
    // }

    //En este punto usamos dicho servicio inyectado anteriormente 
    this.gifsService.buscarGifs(valor);

    this.txtBuscar.nativeElement.value = '';
  };


};
