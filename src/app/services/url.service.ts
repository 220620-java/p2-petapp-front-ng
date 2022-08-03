import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root' // what module this service is being provided in
})
export class UrlService {
  // you might want to make these private with getters
  apiUrl: string = 'http://localhost:8080';
  //apiUrl: string = 'http://petapp-2.us-east-1.elasticbeanstalk.com';

  constructor() { }

}
