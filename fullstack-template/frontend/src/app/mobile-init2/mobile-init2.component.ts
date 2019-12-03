import { Component, OnInit,Output,EventEmitter } from '@angular/core';

@Component({
  selector: 'ami-fullstack-mobile-init2',
  templateUrl: './mobile-init2.component.html',
  styleUrls: ['./mobile-init2.component.scss']
})
export class MobileInit2Component implements OnInit {

  @Output() Init2messages= new EventEmitter();

  constructor() { }

  ngOnInit() {
  }

  back(){
    this.Init2messages.emit("back");
  }

}
