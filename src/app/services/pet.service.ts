import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { Pet } from '../models/pet';
import { User } from '../models/user';
import { UrlService } from './url.service';

@Injectable({
  providedIn: 'root'
})
export class PetService {

  constructor(private urlServ: UrlService, private http: HttpClient) { }

  getAvailablePets(): Observable<Pet[]> {
    // with Fetch: let resp = await fetch(this.urlServ.apiUrl + '/pets');
    // with Fetch: if (resp.ok) return resp.json();

    // sets up the HTTP request and sets up processing to map the response to its correct type
    return this.http.get(this.urlServ.apiUrl + '/pets').pipe(
      map(resp => resp as Pet[])
    );
  }
  
  adoptPet(pet: Pet, userId: number): Observable<User> | void {
    let petappTkn = sessionStorage.getItem('petapp-tkn');
    let petappId = Number.parseInt(sessionStorage.getItem('petapp-id')!);

    if (petappTkn && petappId===userId) {
      let headers = new HttpHeaders({
        'Auth':petappTkn
      });

      return this.http.put(
        this.urlServ.apiUrl + '/pets/' + pet.id + '/adopt/' + userId, pet, {headers:headers})
        .pipe(
        map(resp => resp as User)
      );
    }
  }

  addPet(pet: Pet): Observable<Pet> | void {
    let petappTkn = sessionStorage.getItem('petapp-tkn');

    if (petappTkn) {
      let headers = new HttpHeaders({
        'Auth':petappTkn
      });

      return this.http.post(this.urlServ.apiUrl + '/pets', pet, {headers:headers}).pipe(
        map(resp => resp as User)
      );
    }
  }

  editPet(pet: Pet): Observable<any> | void {
    let petappTkn = sessionStorage.getItem('petapp-tkn');

    if (petappTkn) {
      let headers = new HttpHeaders({
        'Auth':petappTkn
      });

      return this.http.put(this.urlServ.apiUrl + '/pets/' + pet.id, pet, {headers:headers});
    }
  }

  getPetById(id: number): Observable<Pet> {
    return this.http.get(this.urlServ.apiUrl + '/pets/' + id).pipe(
      map(resp => resp as Pet)
    );
  }
}
