import {Component, OnInit} from '@angular/core';
import {routerTransition} from '../routing/router-transitions';
import {DataAccessService} from '../data-access.service';
import {Transaction} from '../model/transaction';

@Component({
  selector: 'app-overview',
  templateUrl: './overview.component.html',
  styleUrls: ['./overview.component.css'],
  animations: [routerTransition()]
})
export class OverviewComponent implements OnInit {

  transactions: Transaction[];

  constructor(private sharedData: DataAccessService) { }

  ngOnInit() {
    this.sharedData.currentTransactions().subscribe((trans: Transaction[]) => this.transactions = trans);
    console.log(this.transactions);
  }

}
