import { Component, OnInit } from '@angular/core';
import { UrlService } from 'src/app/services/url.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-my-pets',
  templateUrl: './my-pets.component.html',
  styleUrls: ['./my-pets.component.css']
})
export class MyPetsComponent implements OnInit {
  loggedInUser:any;
  message:string='You don\'t have any pets! Try adopting some. :)';

  constructor(private userServ: UserService) { }

  ngOnInit(): void {
    this.setupUser();
  }

  async setupUser() {
    this.loggedInUser = await this.userServ.getLoggedInUser();
  }
}
