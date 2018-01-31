import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {Period} from '../model/transaction';

@Component({
  templateUrl: 'add-transaction-dialog.component.html'
})
export class AddTransactionDialogComponent {

  periods = [Period.Daily, Period.Weekly, Period.Quarter, Period.Monthly, Period.SixMonths, Period.Yearly];

  dialogTitle: string;

  title: string;
  category: string;
  period = this.periods[Period.Monthly];
  value: number;
  isIncome = false;

  constructor(public dialogRef: MatDialogRef<AddTransactionDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any) {
    this.dialogTitle = data.title;
    if (data.transaction) {
      const t = data.transaction;
      this.title = t.title;
      this.category = t.category;
      this.period = t.period;
      this.value = t.value;
      this.isIncome = t.isIncome;
    }
  }

}
