import { Component, OnInit,Input,Output,EventEmitter } from '@angular/core';

@Component({
  selector: 'ami-fullstack-playerhistory',
  templateUrl: './playerhistory.component.html',
  styleUrls: ['./playerhistory.component.scss']
})
export class PlayerhistoryComponent implements OnInit {
  
  @Output() ExitMessage= new EventEmitter();
 
  constructor() { }

  @Input() image : String;
  @Input() name : String;

  ngOnInit() {
  }

  exit(){
    this.ExitMessage.emit("exit");
  }

}
