import { Component, Input, OnInit } from '@angular/core';
import { UrlService } from 'src/app/services/url.service';

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

  constructor(private urlServ: UrlService) { }

  ngOnInit(): void {
    this.getLoggedInUser();
  }

  async getLoggedInUser() {
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

  async adoptPet() {
    if (this.pet) {
      let resp = await fetch(this.urlServ.apiUrl+'/pets/'+this.pet.id+'/adopt/'+this.loggedInUser.id, {
          method:'PUT',
          body:JSON.stringify(this.pet),
          headers:new Headers({
              'Content-Type':'application/json'!,
              'Auth':sessionStorage.getItem('petapp-tkn')!
          })
      });

      if (resp.ok) {
          this.loggedInUser = await resp.json();
          this.pet.status.name = 'Adopted';
      }
    }

  }

}
