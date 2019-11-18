import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'ami-fullstack-smarttable',
  templateUrl: './smarttable.component.html',
  styleUrls: ['./smarttable.component.scss']
})
export class SmarttableComponent implements OnInit {

  constructor() { }

  players = [
    {"width" : "59%" , "color" : "red" , "name" : "DeadPool" , "img" : "assets/avatars/deadpool.png"},
    {"width" : "50%" , "color" : "yellow" , "name" : "Picachu" , "img" : "assets/avatars/picachu.png"},
    {"width" : "50%" , "color" : "orange" , "name" : "Iron Man" , "img" : "assets/avatars/ironman.png"},
    {"width" : "50%" , "color" : "red" , "name" : "Spiderman" , "img" : "assets/avatars/spiderman.jpg"},
    {"width" : "50%" , "color" : "brown" , "name" : "Bear" , "img" : "assets/avatars/bear.png"},
    {"width" : "30%" , "color" : "blue" , "name" : "Spongebob" , "img" : "assets/avatars/spongbob.png"},
    {"width" : "20%" , "color" : "brown" , "name" : "Bear" , "img" : "assets/avatars/bear.png"},
    {"width" : "10%" , "color" : "blue" , "name" : "Spongebob" , "img" : "assets/avatars/spongbob.png"},    
    {"width" : "0%" , "color" : "brown" , "name" : "Bear" , "img" : "assets/avatars/bear.png"},
    {"width" : "0%" , "color" : "blue" , "name" : "Spongebob" , "img" : "assets/avatars/spongbob.png"},

  ]
  ngOnInit() {
  }

}
