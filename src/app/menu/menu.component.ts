import {Component} from '@angular/core';
import {routerTransition} from '../routing/router-transitions';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css'],
  animations: [routerTransition()]
})
export class MenuComponent {

  isDarkTheme = false;

}

