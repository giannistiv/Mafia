import { Component, OnInit } from '@angular/core';
import { RequestService } from '../services/request.service';
import { NameService } from '../services/name.service';

@Component({
  selector: 'ami-fullstack-mobile',
  templateUrl: './mobile.component.html',
  styleUrls: ['./mobile.component.scss']
})
export class MobileComponent implements OnInit {

  public bio: boolean;
  public day: boolean;
  public history: boolean;
  public img: string;
  constructor(
    private requestService : RequestService,
    private nameService : NameService
  ) {
   }

  players = [
    // { "name": "DeadPool", "img": "assets/avatars/deadpool.png" },
    // { "name": "Pikachu", "img": "assets/avatars/pikachu.png" },
    // { "name": "Iron Man", "img": "assets/avatars/ironman.png" },
    // { "name": "Spiderman", "img": "assets/avatars/spiderman.png" },
    // { "name": "Mario", "img": "assets/avatars/mario.png" },
    // { "name": "Luigi", "img": "assets/avatars/luigi.png" },
    // { "name": "Batman", "img": "assets/avatars/batman.png" },
    // { "name": "Sonic", "img": "assets/avatars/sonic.png" },
    // { "name": "Spongebob", "img": "assets/avatars/spongebob.png" },
  ]

  personalData = "Tsirakos"

  ngOnInit() {
    this.bio = false;
    this.day = true;
    this.history = false;

    this.personalData = this.nameService.getPersonalData();
    console.log(this.personalData);
    this.requestService.getPlayers().then((player : any[]) => {
      console.log(player);
      this.players = player
    })
  }

  messagesfrombio(event) {
    this.bio = true;
  }

  messagesfromhistory(event) {
    this.history = true;
  }

  messagesfromexit(event) {
    this.bio = false;
    this.history = false;
  }

  messagesfromday(event) {
    this.day = !this.day;
  }

  messagesfrombody(event) {
    this.img = event.img;
    console.log(event);
  }


}