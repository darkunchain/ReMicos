import { Component, OnInit } from '@angular/core';
import { cliente } from '../../models/cliente'


@Component({
  selector: 'app-clientes',
  templateUrl: './clientes.component.html',
  styleUrls: ['./clientes.component.css']
})
export class ClientesComponent implements OnInit {

  clientes: cliente[] =[];
  visible: string ='';
 

  constructor() { }

  openPopup() {
   this.visible ='true'
  }


  ngOnInit(): void {



    this.clientes = [
      {
        id:0,
        nombre: 'Juan Lucas Prieto',
        telefono: 3175027179,
        card: 5
      },

      {
        id:0,
        nombre: 'Emma Prieto',
        telefono: 3123445125,
        card: 6
      },

      {
        id:0,
        nombre: 'Jhon Plazas',
        telefono: 3117652354,
        card: 7
      },

      {
        id:0,
        nombre: 'Carlos Fernandez',
        telefono: 3106871234,
        card: 8
      },

      {
        id:0,
        nombre: 'Nicolas Cantor',
        telefono: 3206740967,
        card: 9
      }
    ]
  }

}
