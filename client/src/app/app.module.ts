import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { MatIconModule, MatCardModule, MatCheckboxModule, MatGridListModule, MatButtonModule, MatSidenavModule, MatToolbarModule, MatFormFieldModule, MatSelectModule, MatOptionModule, MatInputModule } from '@angular/material';
import { AgmCoreModule } from '@agm/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { HttpClientModule } from '@angular/common/http';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';

import { GravatarModule } from  'ngx-gravatar';
import {WebStorageModule, LocalStorageService} from "ngx-store";

import { AppRoutingModule, routingComponents } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavComponent } from './nav/nav.component';
import { ContactComponent } from './contact/contact.component';
import { HomeComponent } from './home/home.component';
import { BookformComponent } from './bookform/bookform.component';
import { SearchBarComponent } from './searchbar/searchbar.component';
import { SearchresultsComponent } from './searchresults/searchresults.component';
import { AboutComponent } from './about/about.component';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { MapComponent } from './map/map.component';
import { AccountComponent } from './account/account.component';
import { AddcarformComponent } from './addcarform/addcarform.component';

@NgModule({
  declarations: [
    AppComponent,
    NavComponent,
    ContactComponent,
    AboutComponent,
    HomeComponent,
    routingComponents,
    MapComponent,
    BookformComponent,
    LoginComponent,
    SignupComponent,
    SearchBarComponent,
    SearchresultsComponent,
    AccountComponent,
    AddcarformComponent
  ],
  imports: [
    WebStorageModule,
    GravatarModule,
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatInputModule,
    MatIconModule,
    MatCheckboxModule,
    MatGridListModule,
    MatFormFieldModule,
    MatSelectModule,
    MatCardModule,
    MatOptionModule,
    MatToolbarModule,
    MatSidenavModule,
    FlexLayoutModule,
    HttpClientModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyAEEomchXOIqSpxPRsF0S0cocFaNnCPWx4'
    }),
    BsDatepickerModule.forRoot()
  ],
  providers: [LocalStorageService],
  bootstrap: [AppComponent]
})
export class AppModule { }
export class PizzaPartyAppModule { }
