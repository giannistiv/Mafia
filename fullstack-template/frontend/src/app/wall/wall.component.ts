import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'ami-fullstack-wall',
  templateUrl: './wall.component.html',
  styleUrls: ['./wall.component.scss']
})
export class WallComponent implements OnInit {

  public night: boolean;

  constructor() { }

  ngOnInit() {
    this.night= false;
  }
  
  chnight(){
    this.night=!this.night;
  }

}
