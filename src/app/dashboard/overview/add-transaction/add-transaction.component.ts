import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {Transaction} from '../../../entity/transaction.model';

@Component({
  selector: 'app-add-transaction',
  templateUrl: './add-transaction.component.html',
  styleUrls: ['./add-transaction.component.css']
})
export class AddTransactionComponent implements OnInit {

  @Output() transactionEmitter: EventEmitter<Transaction> = new EventEmitter();
  @Output() download: EventEmitter<string> = new EventEmitter();

  public title: string;
  public category: string;
  public period: string;
  public value: string;

  constructor() { }

  ngOnInit() {
  }

  public onSubmit(): void {
    const trans: Transaction = new Transaction(this.title, this.category, this.period, this.value);
    this.transactionEmitter.emit(trans);
  }

  public onDownload(): void {
    this.download.emit();
  }

}
