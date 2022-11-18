import { Component, EventEmitter, OnInit, Output, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';

import { AuthService } from 'src/app/auth/auth.service';

@Component({
  selector: 'app-sidenav-list',
  templateUrl: './sidenav-list.component.html',
  styleUrls: ['./sidenav-list.component.scss']
})
export class SidenavListComponent implements OnInit, OnDestroy {
  isAuth: boolean = false;
  authSub!: Subscription;
  @Output() closeSidenav = new EventEmitter<void>();

  constructor(private autService: AuthService) { }

  ngOnDestroy(): void {
    this.authSub?.unsubscribe();
  }

  ngOnInit(): void {
    this.authSub = this.autService.authChange$.subscribe(isAuth => {
       this.isAuth = isAuth;
    })
  }
  
  onClose(){
    this.closeSidenav.emit()
  }

  onLogout(){
    this.onClose();
    this.autService.logout();
  }

}
