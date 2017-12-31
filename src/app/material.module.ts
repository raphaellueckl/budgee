import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FlexLayoutModule} from '@angular/flex-layout';
import {
MatButtonModule,
MatCardModule,
MatCheckboxModule,
MatDialogModule,
MatIconModule,
MatInputModule,
MatListModule,
MatMenuModule,
MatSelectModule,
MatSidenavModule,
MatSlideToggleModule,
MatTabsModule,
MatToolbarModule
} from '@angular/material';
import 'hammerjs';

@NgModule({
  imports: [
    CommonModule
  ],
  exports: [
    // Material
    MatButtonModule,
    MatCardModule,
    MatCheckboxModule,
    MatDialogModule,
    MatIconModule,
    MatInputModule,
    MatListModule,
    MatMenuModule,
    MatSelectModule,
    MatSidenavModule,
    MatSlideToggleModule,
    MatTabsModule,
    MatToolbarModule,
    // Flex-layout
    FlexLayoutModule
  ],
  declarations: []
})
export class MaterialModule {
}
