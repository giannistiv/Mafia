import { Component, OnInit } from '@angular/core';
import { SocketsService } from '../global/services';

@Component({
  selector: 'ami-fullstack-wall-init',
  templateUrl: './wall-init.component.html',
  styleUrls: ['./wall-init.component.scss']
})
export class WallInitComponent implements OnInit {

  public rp=0;

  constructor(
    private socketservice: SocketsService
  ) { }

  ngOnInit() {
    this.socketservice.syncMessages("activate_players_on_change").subscribe((players)=>{this.rp=players.message});
  }

}
