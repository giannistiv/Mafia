import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'ami-fullstack-avatars-list',
  templateUrl: './avatars-list.component.html',
  styleUrls: ['./avatars-list.component.scss']
})
export class AvatarsListComponent implements OnInit {

  @Input() votes;
  player = []
  constructor() {
  }
  
  
  
  ngOnInit() {
    for(var i = 0; i < this.votes; i++){
      console.log("added")
      this.player.push("assets/avatars/deadpool.png")
    }

  }

}
