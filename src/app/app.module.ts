import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavComponent } from './components/nav/nav.component';
import { AvailablePetsComponent } from './components/available-pets/available-pets.component';
import { MyPetsComponent } from './components/my-pets/my-pets.component';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { PetComponent } from './components/pet/pet.component';
import { UrlService } from './services/url.service';
import { PetSearchPipe } from './pipes/pet-search.pipe';

@NgModule({
  declarations: [
    AppComponent,
    NavComponent,
    AvailablePetsComponent,
    MyPetsComponent,
    HomeComponent,
    LoginComponent,
    PetComponent,
    PetSearchPipe
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule // allows us to use ngModel two-way binding
  ],
  providers: [
    UrlService // adding this so that it can be injected as a dependency
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
