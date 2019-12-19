import { Component, OnInit } from '@angular/core';
import { RequestService } from '../services/request.service';
import { SocketsService } from '../global/services';

@Component({
  selector: 'ami-fullstack-wall',
  templateUrl: './wall.component.html',
  styleUrls: ['./wall.component.scss']
})
export class WallComponent implements OnInit {

  public night: boolean;
  public roles : any
  constructor(
    private requestservice: RequestService,
    private socketService : SocketsService
  ) { }

  ngOnInit() {
    this.night= false;
    this.requestservice.getRolesInfo().then((data) => {

      this.roles = data;
      console.log(this.roles);
      

      this.roles.forEach(elem => {
        const element = document.getElementById(elem.name);
        element.innerHTML = elem.counter;
      })
    })


    this.socketService.syncMessages("on_active_players_change").subscribe(data => {
      const elem = document.getElementById("activeplayers");
      elem.innerHTML = data.message;
    })
  }
  
  chnight(){
    this.night=!this.night;
  }

}
