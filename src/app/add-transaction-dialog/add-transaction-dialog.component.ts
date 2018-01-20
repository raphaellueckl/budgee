import {Component} from '@angular/core';
import {MatDialogRef} from '@angular/material';
import {Period} from '../model/transaction';

@Component({
  templateUrl: 'add-transaction-dialog.component.html'
})
export class AddTransactionDialogComponent {

  periods = [Period.Daily, Period.Weekly, Period.Quarter, Period.Monthly, Period.SixMonths, Period.Yearly];

  title: string;
  category: string;
  period = this.periods[Period.Monthly];
  value: number;
  isIncome = false;

  constructor(public dialogRef: MatDialogRef<AddTransactionDialogComponent>) {
  }

}
