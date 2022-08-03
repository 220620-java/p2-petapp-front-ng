import { Component, OnInit } from '@angular/core';
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

  constructor(private urlServ: UrlService) { }

  ngOnInit(): void {
    this.getPets();
  }

  async getPets() {
    let resp = await fetch(this.urlServ.apiUrl+'/pets');

    if (resp.ok) {
        this.pets = await resp.json();
    }

  }

}
