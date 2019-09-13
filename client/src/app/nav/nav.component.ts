import { Component, OnInit } from '@angular/core';




@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {

 private  hideAbout: boolean = false;
  private  hideMap: boolean = true;
  
  appTitle: string = 'Carfish';

  constructor() { }

  ngOnInit() {
  }
 
  public aboutOff(){
    this.hideAbout = false;
  }
  public aboutOn(){
    this.hideAbout = true;
  }
  
  public mapOff(){
    this.hideMap = false;
  }
  public mapOn(){
    this.hideMap = true;
  }
  

}



