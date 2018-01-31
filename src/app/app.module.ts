import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {ServiceWorkerModule} from '@angular/service-worker';
import {AppComponent} from './app.component';
import {environment} from '../environments/environment';
import {TransactionDialogComponent} from './transaction-dialog/transaction-dialog.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {FormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import {MaterialModule} from './material.module';
import {TransactionsComponent} from './transactions/transactions.component';
import {OverviewComponent} from './overview/overview.component';
import {MenuComponent} from './menu/menu.component';
import {ManageComponent} from './manage/manage.component';
import {RoutingModule} from './routing/routing.module';
import {DataAccessService} from './data-access.service';
import {PieComponent} from './pie/pie.component';
import {SumPipe} from './_pipes/sum.pipe';
import {DownloadDialogComponent} from './download-dialog/download-dialog.component';
import {FlexLayoutModule} from '@angular/flex-layout';


@NgModule({
  declarations: [
    AppComponent,
    TransactionDialogComponent,
    TransactionsComponent,
    OverviewComponent,
    MenuComponent,
    ManageComponent,
    PieComponent,
    SumPipe,
    DownloadDialogComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpClientModule,
    ServiceWorkerModule.register('/ngsw-worker.js', {enabled: environment.production}),

    FlexLayoutModule,
    MaterialModule,
    RoutingModule
  ],
  providers: [
    DataAccessService,
  ],
  entryComponents: [
    TransactionDialogComponent,
    DownloadDialogComponent
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
