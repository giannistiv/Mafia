import { Component, OnInit,Output,EventEmitter, Input } from '@angular/core';

@Component({
  selector: 'ami-fullstack-mobile-bio',
  templateUrl: './mobile-bio.component.html',
  styleUrls: ['./mobile-bio.component.scss']
})
export class MobileBioComponent implements OnInit {

  @Output() ExitMessage= new EventEmitter();
  @Input() player;
  
  constructor() {

  }

  ngOnInit() {
  }

  exit(){
    this.ExitMessage.emit("exit");
  }

}
