import { Component, OnInit } from '@angular/core';
import { PetService } from 'src/app/services/pet.service';
import { UrlService } from 'src/app/services/url.service';

@Component({
  selector: 'app-available-pets',
  templateUrl: './available-pets.component.html',
  styleUrls: ['./available-pets.component.css']
})
export class AvailablePetsComponent implements OnInit {
  message:string='There are no pets available currently! Try again later.';
  pets: any[] = [];
  searchText:string = '';

  constructor(private petServ: PetService) { }

  ngOnInit(): void {
    this.getPets();
  }

  getPets() {
    // with Fetch: let resp = await fetch(url)
    // with Fetch: if (resp.ok) this.pets = await resp.json();
    
    // alternatively with Fetch in the service: this.pets = await this.petServ.getPets();

    this.petServ.getAvailablePets().subscribe(
      resp => {
        this.pets = resp;
      }
      // error => { Passing in multiple callbacks like this 
      // console.log(error); is deprecated in rxJS
      // } you should use an observer argument
    );
  }

}
