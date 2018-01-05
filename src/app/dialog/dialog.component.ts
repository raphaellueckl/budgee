import {Component} from '@angular/core';
import {MatDialogRef} from '@angular/material';
import {Period, Transaction} from '../model/transaction';

@Component({
  templateUrl: 'dialog.component.html'
})
export class DialogComponent {

  periods = [Period.Daily, Period.Weekly, Period.Quarter, Period.Monthly, Period.SixMonths, Period.Yearly];

  title: string;
  category: string;
  period = this.periods[Period.Monthly];
  value: number;
  isIncome = false;

  constructor(public dialogRef: MatDialogRef<DialogComponent>) {
  }

}
