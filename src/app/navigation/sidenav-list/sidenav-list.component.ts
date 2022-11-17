import { Component, EventEmitter, OnInit, Output, OnDestroy } from '@angular/core';
import { AuthService } from 'src/app/auth/auth.service';

@Component({
  selector: 'app-sidenav-list',
  templateUrl: './sidenav-list.component.html',
  styleUrls: ['./sidenav-list.component.scss']
})
export class SidenavListComponent implements OnInit, OnDestroy {
  isAuth: boolean = false;
  @Output() closeSidenav = new EventEmitter<void>();

  constructor(private autService: AuthService) { }

  ngOnDestroy(): void {
    this.autService.authChange?.unsubscribe();
  }

  ngOnInit(): void {
    this.autService.authChange.subscribe(isAuth => {
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
