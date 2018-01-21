import {Component, OnInit} from '@angular/core';

import 'rxjs/add/operator/filter';
import {DataAccessService} from './data-access.service';
import {Budget} from './my-budget';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  constructor(private sharedData: DataAccessService) {}

  ngOnInit(): void {
    this.useMockData();
  }

  useMockData() {
    // Fixme: Uncomment this code and comment the rest to make this thing work.
    // const transactions = [];
    // for (let i = 1; i <= 7; i++) {
    //   const t = new Transaction();
    //   t.title = `Hans ${i}`;
    //   t.category = 'Cat ' + i;
    //   t.period = Period.Monthly;
    //   t.value = i;
    //   t.isIncome = true;
    //   transactions.push(t);
    // }
    // this.sharedData.setTransactions(transactions);
    this.sharedData.setTransactions(new Budget().data);
  }

}
