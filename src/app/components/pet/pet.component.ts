import { Component, Input, OnInit } from '@angular/core';
import { PetService } from 'src/app/services/pet.service';
import { UrlService } from 'src/app/services/url.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-pet',
  templateUrl: './pet.component.html',
  styleUrls: ['./pet.component.css']
})
export class PetComponent implements OnInit {
  today: Date = new Date(2022, 8, 3);
  loggedInUser:any;
  // we can set any field as a property/attribute of the component directive
  // in order to accept input from the parent component by using @Input decorator
  @Input() pet:any;

  constructor(private userServ: UserService, private petServ: PetService) { }

  ngOnInit(): void {
    this.getLoggedInUser();
  }

  async getLoggedInUser() {
    this.loggedInUser = await this.userServ.getLoggedInUser();
  }

  adoptPet() {
    if (this.pet) {
      this.petServ.adoptPet(this.pet, this.loggedInUser.id)?.subscribe(
        resp => {
          this.loggedInUser = resp;
        }
      );
    }

  }

}
