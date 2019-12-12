import { Component, OnInit, Input,Output,EventEmitter } from '@angular/core';

@Component({
  selector: 'ami-fullstack-mobile-body',
  templateUrl: './mobile-body.component.html',
  styleUrls: ['./mobile-body.component.scss']
})
export class MobileBodyComponent implements OnInit {

  @Output() imgMessage= new EventEmitter();

  constructor() { }
  @Input() image : String;
  @Input() name : String;
  ngOnInit() {
  }

  changeimg(){
    this.imgMessage.emit({ "img" : this.image , "name" : this.name});
  }

}
