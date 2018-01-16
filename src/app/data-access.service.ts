import {Injectable} from '@angular/core';
import {Transaction} from './model/transaction';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';
import {Observable} from 'rxjs/Observable';

@Injectable()
export class DataAccessService {

  private transactions: Transaction[] = [];
  private messageSource = new BehaviorSubject<Transaction[]>(this.transactions);

  constructor() {
  }

  currentTransactions(): Transaction[] {
    return this.transactions;
  }

  transactionListener(): Observable<Transaction[]> {
    return this.messageSource.asObservable();
  }

  addTransaction(t: Transaction) {
    this.transactions.push(t);
    this.messageSource.next(this.transactions);
  }

  removeTransaction(transaction: Transaction) {
    this.transactions = this.transactions.filter((t: Transaction) => t.title !== transaction.title);
    this.messageSource.next(this.transactions);
  }

}
