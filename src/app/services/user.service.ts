import { Injectable } from '@angular/core';
import { UrlService } from './url.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  loggedInUser: any;

  // angular only has constructor injection
  // things can be injected in any class in the module (not just components)
  constructor(private urlServ: UrlService) { }

  async getLoggedInUser() {
    if (!this.loggedInUser) {
      await this.fetchUser();
    }
    return this.loggedInUser;
  }

  async logIn(username:string, password:string): Promise<boolean> {
    let credentials = {username:username, password:password};

    let resp = await fetch(this.urlServ.apiUrl+'/auth', {
        method:'POST',
        body:JSON.stringify(credentials),
        headers:new Headers({
            'Content-Type':'application/json'
        })
    });

    if (resp.status===200) {
        let loggedInUser = await resp.json();
        if (loggedInUser) {
            sessionStorage.setItem('petapp-tkn', resp.headers.get('Auth')!);
            sessionStorage.setItem('petapp-id', loggedInUser.id);
            return true;
        }
        return false;
    } else {
        return false;
    }
  }

  logOut(): void {
    this.loggedInUser = null;
    sessionStorage.removeItem('petapp-id');
  }

  async fetchUser() {
    let userId = sessionStorage.getItem('petapp-id');
    if (userId) {
      let resp = await fetch(this.urlServ.apiUrl + '/users/' + userId, {
        headers: new Headers({
          'Auth': sessionStorage.getItem('petapp-tkn')!
        })
      });

      if (resp.ok) {
        this.loggedInUser = await resp.json();
      }
    }
  }
}
