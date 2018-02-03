import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {MatDialog, MatPaginator, MatSnackBar, MatSnackBarConfig, MatSort, MatTableDataSource} from '@angular/material';
import {TransactionDialogComponent} from '../transaction-dialog/transaction-dialog.component';
import {routerTransition} from '../routing/router-transitions';
import {Transaction} from '../model/transaction';
import {DataAccessService} from '../data-access.service';
import {DownloadDialogComponent} from '../download-dialog/download-dialog.component';

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

    this.dataSource = new MatTableDataSource([]);

    this.sharedData.transactionListener().subscribe((t: Transaction[]) => {
      this.dataSource.data = t;
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
    const dialogData = {
      data: {
        title: 'Add Transaction'
      }
    };
    this.dialog.open(TransactionDialogComponent, dialogData).afterClosed()
      .filter(result => !!result)
      .subscribe(t => {
        this.sharedData.addTransaction(t);
        this.snackBar.open('Transaction added', undefined, this.snackBarConfig);
      });
  }

  editSelectedTransaction(selectedTransaction: Transaction) {
    const dialogData = {
      data: {
        title: 'Edit Transaction',
        transaction: selectedTransaction
      }
    };
    this.dialog.open(TransactionDialogComponent, dialogData).afterClosed()
      .filter(result => !!result)
      .subscribe(t => {
        this.sharedData.editTransaction(selectedTransaction, t);
        this.snackBar.open('Transaction edited', undefined, this.snackBarConfig);
      });
  }

  downloadTransactionsDialog() {
    this.dialog.open(DownloadDialogComponent).afterClosed()
      .filter(result => !!result)
      .subscribe(t => {
        this.exportJson(this.dataSource.data);
      });
  }

  removeTransaction(row) {
    const filtered: Transaction = this.dataSource.data.filter((trans: Transaction) => trans.title === row.title).shift();
    this.snackBar.open('Transaction removed', undefined, this.snackBarConfig);
    this.sharedData.removeTransaction(filtered);
  }

  private exportJson(data: Transaction[]): void {
    const c = JSON.stringify(data);
    const file = new Blob([c], {type: 'text/json'});
    this.downloadFileWithContent('transactions.json', file);
  }

  private downloadFileWithContent(filename, blob): void {
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
