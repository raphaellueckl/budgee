import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {OverviewComponent} from './overview/overview.component';
import {StatisticsComponent} from './statistics/statistics.component';
import {CalculatorComponent} from './calculator/calculator.component';

const routes: Routes = [
  { path: '', redirectTo: '/overview', pathMatch: 'full' },
  { path: 'overview',  component: OverviewComponent },
  { path: 'statistics',  component: StatisticsComponent },
  { path: 'calculator',  component: CalculatorComponent }
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class DashboardRoutingModule {}
