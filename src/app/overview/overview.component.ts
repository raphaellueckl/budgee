import {Component, OnInit} from '@angular/core';
import {routerTransition} from '../routing/router-transitions';
import {DataAccessService} from '../data-access.service';
import {Transaction} from '../model/transaction';
import {PieDataService} from '../pie-data.service';

@Component({
  selector: 'app-overview',
  templateUrl: './overview.component.html',
  styleUrls: ['./overview.component.css'],
  animations: [routerTransition()]
})
export class OverviewComponent implements OnInit {

  transactions: Transaction[];

  // constructor(private sharedData: DataAccessService) { }
  //
  // ngOnInit() {
  //   this.sharedData.currentTransactions().subscribe((trans: Transaction[]) => this.transactions = trans);
  //   console.log(this.transactions);
  // }






  data: Array<any>;
  colours = ['#57A1C6', '#4FC3F7', '#36D7B7'];

  constructor(
    private sharedData: DataAccessService,
    private pieDataService: PieDataService
  ) {}

  ngOnInit() {
    this.sharedData.currentTransactions().subscribe((trans: Transaction[]) => this.transactions = trans);
    console.log(this.transactions);

    this.data = this.pieDataService.generateData(30);
    setInterval(() => {
      this.data = this.pieDataService.generateData(30);
    }, 4000);
  }

}
