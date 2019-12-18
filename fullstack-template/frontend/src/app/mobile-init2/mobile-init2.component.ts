import { Component, OnInit,Output,EventEmitter, Input } from '@angular/core';

@Component({
  selector: 'ami-fullstack-mobile-init2',
  templateUrl: './mobile-init2.component.html',
  styleUrls: ['./mobile-init2.component.scss']
})
export class MobileInit2Component implements OnInit {

  @Output() Init2messages= new EventEmitter();
  @Input() inputImg;
  @Input() inputName;
  @Input() vote: boolean;

  constructor() { }

  ngOnInit() {
  }

  back(){
    this.Init2messages.emit("back");
  }


}
