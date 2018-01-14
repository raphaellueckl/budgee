import {Injectable} from '@angular/core';
import {Transaction} from './model/transaction';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';
import {Observable} from 'rxjs/Observable';

@Injectable()
export class DataAccessService {

  private messageSource = new BehaviorSubject<Transaction[]>([]);
  private currentTrans = this.messageSource.asObservable();

  constructor() {
  }

  currentTransactions(): Observable<Transaction[]> {
    return this.currentTrans;
  }

  setCurrentTransactions(transactions: Transaction[]) {
    this.messageSource.next(transactions);
  }

}
