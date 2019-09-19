import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-searchresults',
  templateUrl: './searchresults.component.html',
  styleUrls: ['./searchresults.component.css']
})
export class SearchresultsComponent implements OnInit {
  @Input() displayResults: any;

  constructor() { }

  ngOnInit() {
  }

}
