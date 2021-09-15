import { Component, Input, OnInit } from '@angular/core';
import { cliente } from '../../models/cliente'

@Component({
  selector: 'app-cliente',
  templateUrl: './cliente.component.html',
  styleUrls: ['./cliente.component.css']
})
export class ClienteComponent implements OnInit {

  @Input() tarjeta:number = 0;
  @Input() nombre:string = '';
  @Input() telefono:string = '';
  @Input() tiempo:string = '';



  constructor() { }

  ngOnInit(): void {
  }

}
