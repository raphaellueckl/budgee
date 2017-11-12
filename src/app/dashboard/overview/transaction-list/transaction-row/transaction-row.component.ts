import {Component, Input, OnInit} from '@angular/core';
import {Transaction} from '../../../../entity/transaction.model';

@Component({
  selector: 'app-transaction',
  templateUrl: './transaction-row.component.html',
  styleUrls: ['./transaction-row.component.css'],
})
export class TransactionComponent implements OnInit {

  @Input() transaction: Transaction;

  constructor() { }

  ngOnInit() {
  }

}
