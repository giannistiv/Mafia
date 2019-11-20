import { Component, OnInit } from '@angular/core';
import { THIS_EXPR, IfStmt } from '@angular/compiler/src/output/output_ast';

@Component({
  selector: 'ami-fullstack-smarttable',
  templateUrl: './smarttable.component.html',
  styleUrls: ['./smarttable.component.scss']
})
export class SmarttableComponent implements OnInit {

  constructor() { }

  showUi = false;
  mouseX = 0;
  mouseY = 0;
  mutexTime = 1;
  showCemetery = false;

  players = [
    {"width" : "40vw" , "color" : "red" , "name" : "DeadPool" , "img" : "assets/avatars/deadpool.png" , "votes" : 4},
    {"width" : "30vw" , "color" : "yellow" , "name" : "Picachu" , "img" : "assets/avatars/picachu.png" , "votes" : 3},
    {"width" : "20vw" , "color" : "orange" , "name" : "Iron Man" , "img" : "assets/avatars/ironman.png" , "votes" : 2},
    {"width" : "10vw" , "color" : "red" , "name" : "Spiderman" , "img" : "assets/avatars/spiderman.png" , "votes" : 1},
    {"width" : "0vw" , "color" : "brown" , "name" : "Bear" , "img" : "assets/avatars/bear.png" , "votes" : 0},
    {"width" : "0vw" , "color" : "blue" , "name" : "Spongebob" , "img" : "assets/avatars/spongbob.png" , "votes" : 0},
    {"width" : "0vw" , "color" : "brown" , "name" : "Bear" , "img" : "assets/avatars/bear.png" , "votes" : 0},
  ]

  coordinates(event){
    if(this.mutexTime == 1){
      this.showUi = true;
    }

    console.log(event.screenX , event.screenY)
    this.mouseX = event.screenX;
    this.mouseY = event.screenY;
  }

  ngOnInit() {
  }


  messagesFromUI(event){
    console.log("[HandUI] Got " + event);
    if(event == "closeUi"){
      this.showUi = false;
      this.mutexTime = 0;
      setTimeout(() => {
        this.mutexTime = 1
      } , 500)
    }else if(event == "showCemetery"){
      this.showCemetery = true;
      this.showUi = false;
      this.mutexTime = 0;
      setTimeout(() => {
        this.mutexTime = 1
      } , 500)
    }

    console.log(event);
  }


  messagesFromCemetery(event){
    console.log("[Cemetery] Got " +  event)

    if(event == "close"){
      this.showCemetery = false;
    }
  }

}
