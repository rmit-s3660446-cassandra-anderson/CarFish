import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { AboutComponent } from './about/about.component';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { MapComponent } from './map/map.component';
import { SearchBarComponent } from './searchbar/searchbar.component';
import { BookformComponent } from './bookform/bookform.component';
import { CarsComponent } from './cars/cars.component';
import { AccountComponent } from './account/account.component';
import { AccountHistoryComponent } from './account-history/account-history.component';
import { AccountDetailsComponent } from './account-details/account-details.component';
import { AddcarformComponent } from './addcarform/addcarform.component';
import { MyVehiclesComponent } from './my-vehicles/my-vehicles.component';

const routes: Routes = [
  {path: '', component: SearchBarComponent},
  {path: 'about', component: AboutComponent},
  {path: 'login', component: LoginComponent},
  {path: 'signup', component: SignupComponent},
  {path: 'booking', component: BookformComponent},
  {path: 'cars', component: CarsComponent},
  {path: 'account', component: AccountComponent,
    children: [
      {path: 'history', component: AccountHistoryComponent},
      {path: 'details', component: AccountDetailsComponent},
      {path: 'registercar', component: AddcarformComponent},
      {path: 'myvehicles', component: MyVehiclesComponent}
  ]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

export const routingComponents = [AboutComponent, MapComponent, LoginComponent, SignupComponent];
