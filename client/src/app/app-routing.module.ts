import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { AboutComponent } from './about/about.component';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { MapComponent } from './map/map.component';



const routes: Routes = [
  {path:'', component: MapComponent},
  {path:'about', component:AboutComponent},
  {path:'login', component:LoginComponent},
  {path:'signup', component:SignupComponent}


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

export const routingComponents = [AboutComponent, MapComponent, LoginComponent, SignupComponent];
