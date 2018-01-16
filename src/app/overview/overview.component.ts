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

  // constructor(private sharedData: DataAccessService) { }
  //
  // ngOnInit() {
  //   this.sharedData.currentTransactions().subscribe((trans: Transaction[]) => this.transactions = trans);
  //   console.log(this.transactions);
  // }

  data: Array<any>;
  colours = ['#57A1C6', '#4FC3F7', '#36D7B7'];

  constructor(
    private sharedData: DataAccessService
  ) {}

  ngOnInit() {
    this.sharedData.currentTransactions().subscribe((trans: Transaction[]) => this.transactions = trans);
    console.log(this.transactions);


    this.data = this.generateData(30);
    // this.data = this.pieDataService.generateData(30);
    // setInterval(() => {
    //   this.data = this.pieDataService.generateData(30);
    // }, 4000);
  }

  generateData(num: number) {
    const operations = [];
    const labels = ['Devices', 'Database', 'API'];
    const types = ['SnmpV1', 'SnmpV2c', 'SnmpV3', 'HttpApi', 'HttpBasic', 'SshBasic', 'SshRsa', 'Wmi', 'Sql', 'MongoDb'];

    for (let i = 0; i < Math.floor(1 + Math.random() * num); i++) {
      const operation = {
        id: i,
        familyType: labels[Math.floor(Math.random() * labels.length)],
        name: 'MAN1-APC-01-Get-Power-Consumption',
        type: types[Math.floor(Math.random() * types.length)]
      };

      operations.push(operation);
    }

    return operations;
  }

}
