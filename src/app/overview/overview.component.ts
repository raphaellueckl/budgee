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
  colours = ['#53DAE8', '#51C6D7', '#4FB3C7', '#4CA0B5', '#488EA4', '#447C92', '#3E6B80', '#385A6E', '#314A5C'];

  expensesByCategoryChartTitle = 'Expenses by category';

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
