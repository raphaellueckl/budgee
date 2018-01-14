import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {MatDialog, MatPaginator, MatSnackBar, MatSnackBarConfig, MatSort, MatTableDataSource} from '@angular/material';
import {DialogComponent} from '../dialog/dialog.component';
import {routerTransition} from '../routing/router-transitions';
import {Period, Transaction} from '../model/transaction';

@Component({
  selector: 'app-manage',
  templateUrl: './manage.component.html',
  styleUrls: ['./manage.component.css'],
  animations: [routerTransition()]
})
export class ManageComponent implements OnInit, AfterViewInit {

  displayedColumns = ['title', 'category', 'period', 'value', 'income', 'remove'];
  dataSource: MatTableDataSource<Transaction>;

  snackBarConfig: MatSnackBarConfig;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private dialog: MatDialog,
              public snackBar: MatSnackBar) {
    const users: Transaction[] = [];
    for (let i = 1; i <= 1; i++) {
      const transaction = new Transaction();
      transaction.title = `Hans ${i}`;
      transaction.category = 'Cat';
      transaction.period = Period.Monthly;
      transaction.value = i;
      transaction.isIncome = true;
      users.push(transaction);
    }

    // Assign the data to the data source for the table to render
    this.dataSource = new MatTableDataSource(users);
  }

  ngOnInit() {
    this.snackBarConfig = new MatSnackBarConfig();
    this.snackBarConfig.duration = 1500;
  }

  /**
   * Set the paginator and sort after the view init since this component will
   * be able to query its view for the initialized paginator and sort.
   */
  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  applyFilter(filterValue: string) {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // Datasource defaults to lowercase matches
    this.dataSource.filter = filterValue;
  }

  addNewTransactionDialog() {
    this.dialog.open(DialogComponent).afterClosed()
      .filter(result => !!result)
      .subscribe(newTransaction => {
        const trans = new Transaction();
        trans.title = newTransaction.title;
        trans.category = newTransaction.category;
        trans.period = <Period>Period[newTransaction.period];
        trans.value = +newTransaction.value;
        trans.isIncome = !!newTransaction.isIncome;
        console.log(trans);
        let data = this.dataSource.data;
        data.push(trans);
        this.dataSource = new MatTableDataSource(data);
        this.snackBar.open('Transaction added', undefined, this.snackBarConfig);
      });
  }

  removeTransaction(row) {
    const filtered = this.dataSource.data.filter(trans => trans.title !== row.title);
    this.dataSource.data = filtered;
    this.snackBar.open('Transaction removed', undefined, this.snackBarConfig);
  }

  // TODO Export transactions to JSON, currently unused
  exportJson(): void {
    console.log('Exporting: ' + this.dataSource.data);
    const c = JSON.stringify(this.dataSource.data);
    const file = new Blob([c], {type: 'text/json'});
    this.download(file, 'transactions.json');
  }

  download(blob, filename): void {
    const a = document.createElement('a'),
      url = URL.createObjectURL(blob);
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    setTimeout(function () {
      document.body.removeChild(a);
      window.URL.revokeObjectURL(url);
    }, 0);
  }

}

export interface UserData {
  id: string;
  name: string;
  progress: string;
  color: string;
}
