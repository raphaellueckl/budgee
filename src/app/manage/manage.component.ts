import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {MatDialog, MatPaginator, MatSnackBar, MatSnackBarConfig, MatSort, MatTableDataSource} from '@angular/material';
import {AddTransactionDialogComponent} from '../add-transaction-dialog/add-transaction-dialog.component';
import {routerTransition} from '../routing/router-transitions';
import {Period, Transaction} from '../model/transaction';
import {DataAccessService} from '../data-access.service';

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
              public snackBar: MatSnackBar,
              private sharedData: DataAccessService) {
  }

  ngOnInit() {
    this.snackBarConfig = new MatSnackBarConfig();
    this.snackBarConfig.duration = 1500;

    this.sharedData.transactionListener().subscribe((t: Transaction[]) => {
      this.dataSource = new MatTableDataSource(t);
    });
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
    this.dialog.open(AddTransactionDialogComponent).afterClosed()
      .filter(result => !!result)
      .subscribe(t => {
        const newTransaction = this.convertToTransaction(t);
        this.sharedData.addTransaction(newTransaction);
        this.snackBar.open('Transaction added', undefined, this.snackBarConfig);
      });
  }

  removeTransaction(row) {
    const filtered: Transaction = this.dataSource.data.filter((trans: Transaction) => trans.title === row.title).shift();
    this.snackBar.open('Transaction removed', undefined, this.snackBarConfig);
    this.sharedData.removeTransaction(filtered);
  }

  // TODO Export transactions to JSON, currently unused
  exportJson(): void {
    console.log('Exporting: ' + this.dataSource.data);
    const c = JSON.stringify(this.dataSource.data);
    const file = new Blob([c], {type: 'text/json'});
    this.download(file, 'transactions.json');
  }

  private download(blob, filename): void {
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

  private convertToTransaction(newTransaction) {
    const trans = new Transaction();
    trans.title = newTransaction.title;
    trans.category = newTransaction.category;
    trans.period = <Period>Period[newTransaction.period];
    trans.value = +newTransaction.value;
    trans.isIncome = !!newTransaction.isIncome;
    return trans;
  }

}
