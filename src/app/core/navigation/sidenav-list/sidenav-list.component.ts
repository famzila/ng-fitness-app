import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';

import { AuthService } from 'src/app/auth/auth.service';
import * as fromRoot from '../../../app.reducer';
import * as Auth from '../../../auth/auth.actions';

@Component({
  selector: 'app-sidenav-list',
  templateUrl: './sidenav-list.component.html',
  styleUrls: ['./sidenav-list.component.scss']
})
export class SidenavListComponent implements OnInit {
  isAuth$!: Observable<boolean>;
  @Output() closeSidenav = new EventEmitter<void>();

  constructor(private autService: AuthService, private store: Store<fromRoot.State>) { }


  ngOnInit(): void {
    this.isAuth$ = this.store.select(fromRoot.getIsAuthenticated);
  }
  
  onClose(){
    this.closeSidenav.emit()
  }

  onLogout(){
    this.onClose();
    this.autService.logout();
  }

}
