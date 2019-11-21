import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'ami-fullstack-mobile-body',
  templateUrl: './mobile-body.component.html',
  styleUrls: ['./mobile-body.component.scss']
})
export class MobileBodyComponent implements OnInit {

  constructor() { }
  @Input() image : String;
  @Input() name : String;
  ngOnInit() {
  }

}
