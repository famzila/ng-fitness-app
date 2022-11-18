import { Component, EventEmitter, OnInit, Output, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';

import { AuthService } from 'src/app/auth/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit, OnDestroy {
  isAuth: boolean = false;
  authSub!: Subscription;
  @Output() toggleSidenav= new EventEmitter<void>();

  constructor(private autService: AuthService) { }

  ngOnDestroy(): void {
    this.authSub?.unsubscribe();
  }

  ngOnInit(): void {
    this.authSub = this.autService.authChange$.subscribe(isAuth => {
       this.isAuth = isAuth;
    })
  }

  onToggle(){
    this.toggleSidenav.emit()
  }

  onLogout(){
    this.autService.logout();
  }
}
