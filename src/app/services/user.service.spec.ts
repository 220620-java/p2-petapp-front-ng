import { TestBed } from '@angular/core/testing';
import { User } from '../models/user';
import { UrlService } from './url.service';

import { UserService } from './user.service';

// "describe" creates a test suite: a group of
// related tests (in this case, tests on the user service)
fdescribe('UserService', () => {
  let service: UserService;

  beforeEach(() => {
    // setting up a mini module for testing &
    // adding any dependencies that the service
    // needs to the testing module
    TestBed.configureTestingModule({
      providers: [UrlService]
    });
    service = TestBed.inject(UserService);
  });

  // each "it" is a test spec - an individual scenario
  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should log in successfully', async () => {
    // set up a fake response with the necessary properties
    // in this case, the JSON body, status code, and auth header
    let fakeResp = new Response('{"id":"test"}',
      {status:200, headers:new Headers({'Auth':'test'})}
    );
    // mock fetch to make it send the fake response instead
    spyOn(window, 'fetch').and.resolveTo(fakeResp);
    // expect the correct response from the service
    expect(await service.logIn('','')).toBeTrue();
  });

  it('should login unsuccessful falsy user', async () => {
    let fakeResp = new Response('null',
      {status:200, headers:new Headers({'Auth':'test'})}
    );
    
    spyOn(window, 'fetch').and.resolveTo(fakeResp);

    expect(await service.logIn('','')).toBeFalse();
  });

  it('should login unsuccessful HTTP', async () => {
    let fakeResp = new Response('',
      {status:404}
    );
    
    spyOn(window, 'fetch').and.resolveTo(fakeResp);

    expect(await service.logIn('','')).toBeFalse();
  });

  it('should log out successfully', () => {
    service.loggedInUser = {};
    spyOn(sessionStorage, 'removeItem').and.callFake(()=>{/*empty*/});
    service.logOut();
    expect(service.loggedInUser).toBeFalsy();
  });

  it('should fetch the user successfully', async () => {
    service.loggedInUser=null;
    let fakeResp = new Response('{"id":"test"}',
      {status:200}
    );
    
    spyOn(window, 'fetch').and.resolveTo(fakeResp);
    spyOn(sessionStorage, 'getItem').and.callFake(()=>'test');
    
    await service.fetchUser();
    expect(service.loggedInUser).toBeTruthy();
  });

  it('should get the user when truthy', async () => {
    service.loggedInUser = new User();
    spyOn(service, 'fetchUser');
    expect(await service.getLoggedInUser()).toBeTruthy();

    expect(service.fetchUser).not.toHaveBeenCalled();
  });

  it('should get the user when falsy', async () => {
    service.loggedInUser=null;
    spyOn(service, 'fetchUser').and.resolveTo();
    await service.getLoggedInUser();

    expect(service.fetchUser).toHaveBeenCalledTimes(1);
  });
});
