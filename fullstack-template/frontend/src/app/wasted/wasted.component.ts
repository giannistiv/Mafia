import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'ami-fullstack-wasted',
  templateUrl: './wasted.component.html',
  styleUrls: ['./wasted.component.scss']
})
export class WastedComponent implements OnInit {

  constructor() { }


  @Input() img;
  @Input() imgStyle;
  @Input() deadPerson;
  

  roleStyle = {
    "width" : "100px",
    "height" : "100px"
  }
  ngOnInit() {
  }

}
