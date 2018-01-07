import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {ManageComponent} from '../manage/manage.component';
import {OverviewComponent} from '../overview/overview.component';

const routes: Routes = [
  // { path: '', redirectTo: '/overview', pathMatch: 'full' },
  { path: '', redirectTo: '/manage', pathMatch: 'full' },
  { path: 'overview',  component: OverviewComponent },
  { path: 'manage',  component: ManageComponent},
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forRoot(routes)
  ],
  exports: [ RouterModule ]
})
export class RoutingModule {}
