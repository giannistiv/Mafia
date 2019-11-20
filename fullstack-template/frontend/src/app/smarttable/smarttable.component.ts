import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'ami-fullstack-smarttable',
  templateUrl: './smarttable.component.html',
  styleUrls: ['./smarttable.component.scss']
})
export class SmarttableComponent implements OnInit {

  constructor() { }

  players = [
    {"width" : "40vw" , "color" : "red" , "name" : "DeadPool" , "img" : "assets/avatars/deadpool.png" , "votes" : 4},
    {"width" : "30vw" , "color" : "yellow" , "name" : "Picachu" , "img" : "assets/avatars/picachu.png" , "votes" : 3},
    {"width" : "20vw" , "color" : "orange" , "name" : "Iron Man" , "img" : "assets/avatars/ironman.png" , "votes" : 2},
    {"width" : "10vw" , "color" : "red" , "name" : "Spiderman" , "img" : "assets/avatars/spiderman.jpg" , "votes" : 1},
    {"width" : "0vw" , "color" : "brown" , "name" : "Bear" , "img" : "assets/avatars/bear.png" , "votes" : 0},
    {"width" : "0vw" , "color" : "blue" , "name" : "Spongebob" , "img" : "assets/avatars/spongbob.png" , "votes" : 0},
    {"width" : "0vw" , "color" : "brown" , "name" : "Bear" , "img" : "assets/avatars/bear.png" , "votes" : 0},

  ]
  ngOnInit() {




  }

}
