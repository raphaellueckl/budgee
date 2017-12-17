import {Component, EventEmitter, OnInit, Output, ViewContainerRef} from '@angular/core';
import {Transaction} from '../../../entity/transaction.model';
import {ToastsManager} from 'ng2-toastr';

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

  constructor(public toastr: ToastsManager, vsc: ViewContainerRef) {
    this.toastr.setRootViewContainerRef(vsc);
  }

  ngOnInit() {
  }

  public onSubmit(): void {
    const trans: Transaction = new Transaction(this.title, this.category, this.period, this.value);
    this.toastr.success('Cool!!', 'Yeah!');
    this.transactionEmitter.emit(trans);
  }

  public onDownload(): void {
    this.download.emit();
  }

}
