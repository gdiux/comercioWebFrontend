import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable, tap } from 'rxjs';
import { UserService } from '../services/user.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(  private router:Router,
                private userService: UserService){}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot) {
      return this.userService.validateToken()
      .pipe(
        tap( isauthenticated => {
          if (!isauthenticated) {
            this.router.navigateByUrl('/home');
          }
        })
    );
  }
  
}
