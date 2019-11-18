import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'ami-fullstack-smarttable',
  templateUrl: './smarttable.component.html',
  styleUrls: ['./smarttable.component.scss']
})
export class SmarttableComponent implements OnInit {

  constructor() { }

  players = [
    {"width" : "59%" , "color" : "red" , "name" : "DeadPool" , "img" : "assets/avatars/deadpool.png" , "votes" : 4},
    {"width" : "50%" , "color" : "yellow" , "name" : "Picachu" , "img" : "assets/avatars/picachu.png" , "votes" : 4},
    {"width" : "50%" , "color" : "orange" , "name" : "Iron Man" , "img" : "assets/avatars/ironman.png" , "votes" : 4},
    {"width" : "50%" , "color" : "red" , "name" : "Spiderman" , "img" : "assets/avatars/spiderman.jpg" , "votes" : 4},
    {"width" : "50%" , "color" : "brown" , "name" : "Bear" , "img" : "assets/avatars/bear.png" , "votes" : 4},
    {"width" : "30%" , "color" : "blue" , "name" : "Spongebob" , "img" : "assets/avatars/spongbob.png" , "votes" : 4},
    {"width" : "20%" , "color" : "brown" , "name" : "Bear" , "img" : "assets/avatars/bear.png" , "votes" : 4},
    {"width" : "10%" , "color" : "blue" , "name" : "Spongebob" , "img" : "assets/avatars/spongbob.png" , "votes" : 4},    
    {"width" : "0%" , "color" : "brown" , "name" : "Bear" , "img" : "assets/avatars/bear.png" , "votes" : 4},
    {"width" : "0%" , "color" : "blue" , "name" : "Spongebob" , "img" : "assets/avatars/spongbob.png" , "votes" : 4},

  ]
  ngOnInit() {
  }

}
