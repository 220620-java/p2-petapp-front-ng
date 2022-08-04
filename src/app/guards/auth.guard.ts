import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { UserService } from '../services/user.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  // need the user service to get the logged in user
  // need the router to reroute the user to the login page
  constructor(private userServ: UserService, private router: Router) {}

  async canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Promise<boolean | UrlTree> {
    let user = await this.userServ.getLoggedInUser();

    // if the user is truthy (logged in), they can proceed to the route
    if (user) return true;
    else return this.router.parseUrl('/login');
    // if they're not logged in, send them to the login component
  }
  
}
