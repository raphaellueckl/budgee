import { Component, OnInit } from '@angular/core';
import {routerTransition} from '../router.transition';

@Component({
  selector: 'app-calculator',
  templateUrl: './calculator.component.html',
  styleUrls: ['./calculator.component.css'],
  animations: [routerTransition()]
})
export class CalculatorComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
