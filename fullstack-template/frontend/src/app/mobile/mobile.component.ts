import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'ami-fullstack-mobile',
  templateUrl: './mobile.component.html',
  styleUrls: ['./mobile.component.scss']
})
export class MobileComponent implements OnInit {

  constructor() { }
  players = [
    {"name": "DeadPool", "img": "assets/avatars/deadpool.png" },
    {"name": "Picachu", "img": "assets/avatars/picachu.png" },
    {"name": "Iron Man", "img": "assets/avatars/ironman.png" },
    {"name": "Spiderman", "img": "assets/avatars/spiderman.png" },
    {"name": "Mario", "img": "assets/avatars/mario.png" },
  ]

  ngOnInit() {
  }

}
