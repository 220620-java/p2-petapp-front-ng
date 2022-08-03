import { Component, OnInit } from '@angular/core';
import { UrlService } from 'src/app/services/url.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  message:string='';
  usernameInput:string='';
  passwordInput:string='';

  constructor(private userServ: UserService) { }

  ngOnInit(): void {
  }

  async logIn() {
    this.message = '';
    let success: boolean = await this.userServ.logIn(this.usernameInput, this.passwordInput);

    if (success) {
      // TODO send to home
    } else {
      this.message = 'Incorrect credentials. Please try again.';
    }
  }

}
