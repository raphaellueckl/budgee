import { Component, OnInit } from '@angular/core';
import {routerTransition} from '../router.transition';

@Component({
  selector: 'app-statistics',
  templateUrl: './statistics.component.html',
  styleUrls: ['./statistics.component.css'],
  animations: [routerTransition()]
})
export class StatisticsComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
