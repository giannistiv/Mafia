import { Component, OnInit,Input,Output,EventEmitter } from '@angular/core';

@Component({
  selector: 'ami-fullstack-playerhistory',
  templateUrl: './playerhistory.component.html',
  styleUrls: ['./playerhistory.component.scss']
})
export class PlayerhistoryComponent implements OnInit {
  
  @Output() ExitMessage= new EventEmitter();
  @Output() NextMessage= new EventEmitter();
 
  constructor() { }

  @Input() image : String;
  @Input() name : String;
  @Input() prev : String;
  @Input() next : String;

  ngOnInit() {
  }

  prevp(){
    this.NextMessage.emit(this.prev);
  }

  nextp(){
    this.NextMessage.emit(this.next);
  }

  exit(){
    this.ExitMessage.emit("exit");
  }

}
