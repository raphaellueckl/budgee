import {Injectable} from '@angular/core';
import {Transaction} from './model/transaction';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';
import {Observable} from 'rxjs/Observable';

@Injectable()
export class DataAccessService {

  private transactions: Transaction[] = [];
  private messageSource = new BehaviorSubject<Transaction[]>(this.transactions);
  private currentTrans = this.messageSource.asObservable();

  constructor() {
  }

  currentTransactions(): Observable<Transaction[]> {
    return this.currentTrans;
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
