import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'ami-fullstack-wall-init',
  templateUrl: './wall-init.component.html',
  styleUrls: ['./wall-init.component.scss']
})
export class WallInitComponent implements OnInit {

  public rp;

  constructor() { }

  ngOnInit() {
    this.rp=4;
  }


  addplayer(){
    this.rp=this.rp+1;
  }
  removeplayer(){
    this.rp=this.rp+-1;
  }

}
