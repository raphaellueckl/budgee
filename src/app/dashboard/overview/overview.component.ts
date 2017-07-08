import {Component, Input, OnInit} from '@angular/core';
import {Transaction} from '../../entity/transaction.model';
import { routerTransition } from '../router.transition';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {Location} from '@angular/common';
import {TransactionService} from '../../service/transaction.service';

@Component({
  selector: 'app-overview',
  templateUrl: './overview.component.html',
  styleUrls: ['./overview.component.css'],
  animations: [routerTransition()]
})
export class OverviewComponent implements OnInit {

  transactions: Transaction[] = [];

  constructor(private location: Location,
              private transactionService: TransactionService
  ) { }

  ngOnInit() {
    // TODO Remove
    this.transactions.push(new Transaction('title', 'category', 'period', '123'));
    this.transactions.push(new Transaction('hans', 'kat', 'monat', '5134'));
  }

  public onSubmit(transaction: Transaction) {
    this.transactions.push(transaction);

    this.transactionService.add(transaction);
  }

  download(blob, filename): void {
    const a = document.createElement('a'),
      url = URL.createObjectURL(blob);
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    setTimeout(function() {
      document.body.removeChild(a);
      window.URL.revokeObjectURL(url);
    }, 0);
  }

  exportJson(): void {
    console.log(this.transactions)
    const c = JSON.stringify(this.transactions);
    const file = new Blob([c], {type: 'text/json'});
    this.download(file, 'transactions.json');
  }

}
