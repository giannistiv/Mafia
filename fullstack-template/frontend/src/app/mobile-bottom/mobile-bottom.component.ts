import { Component, OnInit , Input } from '@angular/core';

@Component({
  selector: 'ami-fullstack-mobile-bottom',
  templateUrl: './mobile-bottom.component.html',
  styleUrls: ['./mobile-bottom.component.scss']
})
export class MobileBottomComponent implements OnInit {

  constructor() { }
  @Input() image : String;

  ngOnInit() {
  }


}
