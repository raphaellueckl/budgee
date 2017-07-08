import { Injectable } from '@angular/core';
import {Transaction} from '../entity/transaction.model';
import {Observable} from 'rxjs/Observable';
import {Http, Response} from '@angular/http';
import 'rxjs/Rx';

@Injectable()
export class TransactionService {

  constructor(private http: Http) { }

  add(transaction: Transaction) {

  }

  getAll(): Observable<Transaction[]> {
    return this.http.get('')
      .map((r: Response) => r.json() as Transaction[])
      .catch(e => Observable.throw(e));
  }

}
