import { Component, OnInit } from '@angular/core';
import { UrlService } from 'src/app/services/url.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {
  loggedInUser: any;

  constructor(private userServ: UserService) { }

  ngOnInit(): void {
    this.setupUser();
  }

  async setupUser() {
    this.loggedInUser = await this.userServ.getLoggedInUser();
  }

}
