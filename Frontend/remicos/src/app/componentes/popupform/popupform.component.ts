import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-popupform',
  templateUrl: './popupform.component.html',
  styleUrls: ['./popupform.component.css']
})
export class PopupformComponent implements OnInit {

  enviado = false;

  constructor(private router: Router) { }

  cerrar() {
    this.router.navigate([{outlets: {popupform: null }}]);
  }

  ngOnInit(): void {
  }

}
