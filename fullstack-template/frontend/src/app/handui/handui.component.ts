import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'ami-fullstack-handui',
  templateUrl: './handui.component.html',
  styleUrls: ['./handui.component.scss']
})
export class HanduiComponent implements OnInit {

  constructor() { }

  @Input() x : number;
  @Input() y : number;
  @Output() HandUiMesseger = new EventEmitter();


  position = {};
  
  ngOnInit() {
    
    var newY = this.y - 150;
    var newX = this.x - 150;
    
    this.position = {
      "top" : newY + "px",
      "left" : newX + "px"
    }
  }


  cancel(){
    this.HandUiMesseger.emit("closeUi")
  }


  cemetery(){
    this.HandUiMesseger.emit("showCemetery")
  }


  up(){
    this.HandUiMesseger.emit("up");
  }

  down(){
    this.HandUiMesseger.emit("down");
  }
}
