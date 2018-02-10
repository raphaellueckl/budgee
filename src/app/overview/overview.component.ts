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

  data: Transaction[];
  colours = ['#57A1C6', '#4FC3F7', '#36D7B7'];

  byCategoryChartTitle = 'By category';

  constructor(
    private sharedData: DataAccessService
  ) {}

  ngOnInit() {
    this.transactions = this.sharedData.currentTransactions();
    console.log(this.transactions);

    // this.data = this.loadData();
    this.data = this.transactions;

  }

}
