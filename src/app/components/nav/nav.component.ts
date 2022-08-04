import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {
  @Input() loggedInUser: any;
  @Output() loggedOut: EventEmitter<any> = new EventEmitter();

  constructor(private userServ: UserService, private router: Router) { }

  ngOnInit(): void {
    // not in use
  }

  logOut() {
    this.loggedInUser=null;
    this.userServ.logOut();
    this.loggedOut.emit();
    this.router.navigate(['home']);
  }

}
