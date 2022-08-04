import { Component } from '@angular/core';
import { UserService } from './services/user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'pet-app-ng';
  loggedInUser: any;

  constructor(private userServ: UserService) { }

  async updateLogin() {
    this.loggedInUser = await this.userServ.getLoggedInUser();
  }
}
