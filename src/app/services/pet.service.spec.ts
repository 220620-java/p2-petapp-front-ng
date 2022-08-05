import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';

import { PetService } from './pet.service';
import { UrlService } from './url.service';
import { Pet } from '../models/pet';

fdescribe('PetService', () => {
  let service: PetService;

  beforeEach(() => {
    // test module replaces the real app module
    // during testing, set up dependencies
    // for the service/component/etc.
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [UrlService]
    });
    service = TestBed.inject(PetService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should add pet successfully', () => {
    // to add pet successfully, we need to
    // get the token from storage (to mock),
    // the token needs to be truthy,
    // set up http request & return observable
    // expect the return value to be truthy

    // to mock in Jasmine, we create spies
    // and then specify what we want to happen
    spyOn(sessionStorage, 'getItem').and.returnValue('test');

    // check that the method returns the observable
    expect(service.addPet(new Pet())).toBeTruthy();
  });
});
