import { Component, EventEmitter, OnInit, Output, OnDestroy } from '@angular/core';
import { AuthService } from 'src/app/auth/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit, OnDestroy {
  isAuth: boolean = false;
  @Output() toggleSidenav= new EventEmitter<void>();

  constructor(private autService: AuthService) { }

  ngOnDestroy(): void {
    this.autService.authChange?.unsubscribe();
  }

  ngOnInit(): void {
    this.autService.authChange.subscribe(isAuth => {
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
