import { Component, OnInit } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { multi } from './data';

@Component({
  selector: 'app-barradia',
  templateUrl: './barradia.component.html',
  styleUrls: ['./barradia.component.css']
})
export class BarradiaComponent implements OnInit {
  multi: any[] =[];
  view: any[] = [700, 400];

  // options
  showXAxis: boolean = true;
  showYAxis: boolean = true;
  gradient: boolean = true;
  showLegend: boolean = false;
  showXAxisLabel: boolean = true;
  xAxisLabel: string = '';
  showYAxisLabel: boolean = true;
  yAxisLabel: string = 'Remicos';

  colorScheme = {
    domain: ['#5AA454', '#A10A28', '#C7B42C', '#AAAAAA'],
  };

  constructor() {
    Object.assign(this, { multi });
  }

  onSelect(event) {
    console.log(event);
  }

  ngOnInit(): void {
  }
}
