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
  public round : any = 1
  public activePlayers : any = 0;
  
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


    this.socketService.syncMessages("Night").subscribe(data => {
      this.night = true;
      this.requestservice.getRolesInfo().then((data) => {

        this.roles = data;
        console.log(this.roles);
        
  
        this.roles.forEach(elem => {
          const element = document.getElementById(elem.name);
          element.innerHTML = elem.counter;
        })
      })
    })


    this.socketService.syncMessages("Day").subscribe(data => {
      this.night = false;
      this.requestservice.getRolesInfo().then((data) => {

        this.roles = data;
        console.log(this.roles);
        
  
        this.roles.forEach(elem => {
          const element = document.getElementById(elem.name);
          element.innerHTML = elem.counter;
        })
      })
    })

    this.requestservice.getRound().then(data => {
      this.round = data;
    })


    this.socketService.syncMessages("next_round").subscribe(() => {
      this.round++;
    })

    this.socketService.syncMessages("on_roles_change").subscribe((data) => {
      this.roles = data.message;
      console.log(this.roles);
      

      this.roles.forEach(elem => {
        const element = document.getElementById(elem.name);
        element.innerHTML = elem.counter;
      })
    })


    this.socketService.syncMessages("on_active_players_change").subscribe(data => {
      this.activePlayers = data.message;
    })
  }
  
  chnight(){
    this.night=!this.night;
  }

}
