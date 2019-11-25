import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'ami-fullstack-avatar-icon',
  templateUrl: './avatar-icon.component.html',
  styleUrls: ['./avatar-icon.component.scss']
})
export class AvatarIconComponent implements OnInit {

  constructor() { }

  @Input() img;
  @Input() imgStyle = {};
  
  ngOnInit() {
  }

}
