import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {HttpModule} from '@angular/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { InMemoryWebApiModule } from 'angular2-in-memory-web-api';
// import { InMemoryDataService } from 'in-memory-data.service';

import {AppComponent} from './app.component';
import {DashboardComponent} from './dashboard/dashboard.component';
import {OverviewComponent} from './dashboard/overview/overview.component';
import {StatisticsComponent} from './dashboard/statistics/statistics.component';
import {CalculatorComponent} from './dashboard/calculator/calculator.component';
import {RouterModule} from '@angular/router';
import {TransactionComponent} from './dashboard/overview/transaction-list/transaction-row/transaction-row.component';
import {AddTransactionComponent} from './dashboard/overview/add-transaction/add-transaction.component';
import {TransactionListComponent} from './dashboard/overview/transaction-list/transaction-list.component';
import {DashboardRoutingModule} from './dashboard/dashboard-routing.module';
import {TransactionService} from './service/transaction.service';

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    OverviewComponent,
    StatisticsComponent,
    CalculatorComponent,
    TransactionComponent,
    AddTransactionComponent,
    TransactionListComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    RouterModule,
    DashboardRoutingModule,
    BrowserAnimationsModule,
    // InMemoryWebApiModule.forRoot(InMemoryDataService),
  ],
  providers: [TransactionService],
  bootstrap: [AppComponent]
})
export class AppModule { }
