import {Component, Input, OnChanges, OnInit, SimpleChange} from '@angular/core';
import {Transaction} from '../../../entity/transaction.model';

@Component({
  selector: 'app-transaction-list',
  templateUrl: './transaction-list.component.html',
  styleUrls: ['./transaction-list.component.css']
})
export class TransactionListComponent implements OnInit, OnChanges {

  @Input() public transactions: Transaction[] = [];

  constructor() { }

  ngOnInit() {
    // TODO Remove
    this.transactions.push(new Transaction('title', 'category', 'period', '123'));
  }

  ngOnChanges(changes: {[propKey: string]: SimpleChange}) {
    console.log(changes);
  }

}
