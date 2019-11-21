import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'ami-fullstack-background-image',
  templateUrl: './background-image.component.html',
  styleUrls: ['./background-image.component.scss']
})
export class BackgroundImageComponent implements OnInit {

  constructor() { }


  @Input() type;
  @Input() device;


  ngOnInit() {
  }

}
