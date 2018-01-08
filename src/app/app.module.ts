import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {ServiceWorkerModule} from '@angular/service-worker';
import {AppComponent} from './app.component';
import {environment} from '../environments/environment';
import {DialogComponent} from './dialog/dialog.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {FormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import {MaterialModule} from './material.module';
import {TransactionsComponent} from './transactions/transactions.component';
import {OverviewComponent} from './overview/overview.component';
import {MenuComponent} from './menu/menu.component';
import {ManageComponent} from './manage/manage.component';
import {RoutingModule} from './routing/routing.module';
import {ToastModule} from 'ng2-toastr';


@NgModule({
  declarations: [
    AppComponent,
    DialogComponent,
    TransactionsComponent,
    OverviewComponent,
    MenuComponent,
    ManageComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpClientModule,
    ServiceWorkerModule.register('/ngsw-worker.js', {enabled: environment.production}),

    MaterialModule,
    RoutingModule,
    ToastModule.forRoot()
  ],
  providers: [],
  entryComponents: [DialogComponent],
  bootstrap: [AppComponent]
})
export class AppModule {
}
