import {Component, OnInit} from '@angular/core';
import {routerTransition} from '../routing/router-transitions';

@Component({
  selector: 'app-overview',
  templateUrl: './overview.component.html',
  styleUrls: ['./overview.component.css'],
  animations: [routerTransition()]
})
export class OverviewComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
