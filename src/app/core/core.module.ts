import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../shared/shared.module';
import { HeaderComponent } from './navigation/header/header.component';
import { SidenavListComponent } from './navigation/sidenav-list/sidenav-list.component';



@NgModule({
  declarations: [
    HeaderComponent,
    SidenavListComponent],
  imports: [
    SharedModule,
    RouterModule
  ],
  exports: [
    HeaderComponent,
    SidenavListComponent
  ]
})
export class CoreModule { }
