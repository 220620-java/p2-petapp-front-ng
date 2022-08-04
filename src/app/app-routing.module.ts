import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AvailablePetsComponent } from './components/available-pets/available-pets.component';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { MyPetsComponent } from './components/my-pets/my-pets.component';
import { AuthGuard } from './guards/auth.guard';

// all we need to do is add Route objects to this array
// Route objects have a path and a component
const routes: Routes = [
  {
    path:'', 
    component:HomeComponent
  },
  {path:'home', component:HomeComponent},
  {path:'login', component:LoginComponent},
  {path:'available', component:AvailablePetsComponent},
  // by adding the auth guard to this Route, it will prevent users
  // from going to that path if they are not logged in
  {path:'mypets', component:MyPetsComponent, canActivate:[AuthGuard]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
