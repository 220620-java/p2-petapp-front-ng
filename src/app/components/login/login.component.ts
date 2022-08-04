import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  // @Output allows you to send an event to a parent component
  @Output() loggedIn: EventEmitter<any> = new EventEmitter();

  message:string='';
  usernameInput:string='';
  passwordInput:string='';

  // you can have the module inject the Router so that you can change
  // the route from the TypeScript
  constructor(private userServ: UserService, private router: Router) { }

  ngOnInit(): void {
    // not in use
  }

  async logIn() {
    this.message = '';
    let success: boolean = await this.userServ.logIn(this.usernameInput, this.passwordInput);

    if (success) {
      // this will send the "loggedIn" event to the parent component
      // we could respond in the parent by setting up event binding
      // <app-login (loggedIn)="thingToHappen()"></app-login>
      this.loggedIn.emit();
      this.router.navigate(['home']);
    } else {
      this.message = 'Incorrect credentials. Please try again.';
    }
  }

}
