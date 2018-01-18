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
  labels;

  data: Array<any>;
  colours = ['#57A1C6', '#4FC3F7', '#36D7B7'];

  constructor(
    private sharedData: DataAccessService
  ) {}

  ngOnInit() {
    this.transactions = this.sharedData.currentTransactions();
    console.log(this.transactions);

    this.loadData();
    this.data = this.generateData(30);

  }

  generateData(num: number) {
    const operations = [];
    // const labels = ['Devices', 'Database', 'API']; //categories

    // const types = ['SnmpV1', 'SnmpV2c', 'SnmpV3', 'HttpApi', 'HttpBasic', 'SshBasic', 'SshRsa', 'Wmi', 'Sql', 'MongoDb'];

    for (let i = 0; i < this.labels.length; i++) {
      const operation = {
        category: this.labels[i],
      };

      operations.push(operation);
    }

    return operations;
  }

  private loadData() {
    this.labels = this.transactions.map(t => t.category);
    // this.labels = ['Devices', 'Database', 'API'];
  }

}
