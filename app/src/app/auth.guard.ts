import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { DataManagerService } from './observables/data-manager.service';

@Injectable({
  providedIn: 'root'
})

export class AuthGuard implements  CanActivate{


  constructor( private manager: DataManagerService,
               private router: Router) { }

  canActivate(): boolean {
    if(this.manager.loggedIn()) {
      return true
    } else {
      this.router.navigate(['/login'])
      return false
    }
  }  
}
