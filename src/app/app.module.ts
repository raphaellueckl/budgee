import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {HttpModule} from '@angular/http';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {ServiceWorkerModule, SwPush} from '@angular/service-worker';

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
import {environment} from '../environments/environment';
import { ControlPushComponent } from './control-push/control-push.component';
import {PushService} from './push.service';
import {ConfigService} from './config.service';

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    OverviewComponent,
    StatisticsComponent,
    CalculatorComponent,
    TransactionComponent,
    AddTransactionComponent,
    TransactionListComponent,
    ControlPushComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    RouterModule,
    DashboardRoutingModule,
    BrowserAnimationsModule,
    environment.production
      ? ServiceWorkerModule.register('/ngsw-worker.js')
      : []
  ],
  providers: [
    TransactionService,
    PushService,
    SwPush,
    ConfigService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
