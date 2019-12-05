import { Component, OnInit,Output,EventEmitter } from '@angular/core';

@Component({
  selector: 'ami-fullstack-mobile-header',
  templateUrl: './mobile-header.component.html',
  styleUrls: ['./mobile-header.component.scss']
})
export class MobileHeaderComponent implements OnInit {

  @Output() HeaderMessages= new EventEmitter();
  @Output() DayMessages= new EventEmitter();

  constructor() { }
  
  ngOnInit() {
  }

  bio(){
    this.HeaderMessages.emit("bio");
  }

  day(){
    console.log("mpika");
    this.DayMessages.emit("day");
  }

}
