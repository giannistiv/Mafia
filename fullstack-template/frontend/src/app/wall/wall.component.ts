import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'ami-fullstack-wall',
  templateUrl: './wall.component.html',
  styleUrls: ['./wall.component.scss']
})
export class WallComponent implements OnInit {

  constructor() { }

  activePlayers = 3   
  init = true;
  day = false;
  night = false;
  ngOnInit() {
  }

}
