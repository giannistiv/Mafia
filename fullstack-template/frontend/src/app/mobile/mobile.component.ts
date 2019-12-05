import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'ami-fullstack-mobile',
  templateUrl: './mobile.component.html',
  styleUrls: ['./mobile.component.scss']
})
export class MobileComponent implements OnInit {

  public bio: boolean;
  public day: boolean;

  constructor() { }
  players = [
    {"name": "DeadPool", "img": "assets/avatars/deadpool.png" },
    {"name": "Pikachu", "img": "assets/avatars/pikachu.png" },
    {"name": "Iron Man", "img": "assets/avatars/ironman.png" },
    {"name": "Spiderman", "img": "assets/avatars/spiderman.png" },
    {"name": "Mario", "img": "assets/avatars/mario.png" },
  ]

  ngOnInit() {
    this.bio = false;
    this.day=true;
  }

  messagesfrombio(event){
    this.bio = true;
   }

  messagesfromexit(event){
    this.bio = false;
   }

  messagesfromday(event){
    console.log(event);
    this.day = !this.day;
  }

}