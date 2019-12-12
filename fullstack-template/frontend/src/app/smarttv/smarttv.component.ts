import { Component } from '@angular/core';
import { SocketsService } from '../global/services';

@Component({
  selector: 'app-root',
  templateUrl: './smarttv.component.html',
  styleUrls: ['./smarttv.component.scss']
})
export class SmarttvComponent {

  public history: boolean;
  public img: string;
  public name: string;
  public prev;
  public next;
  show = false;

  title = 'smarttv';

  players = [
    { "name": "Batman", "img": "/assets/avatars/batman.png" },
    { "name": "DeadPool", "img": "/assets/avatars/deadpool.png" },
    { "name": "Iron Man", "img": "/assets/avatars/ironman.png" },
    { "name": "Mario", "img": "/assets/avatars/mario.png" },
    { "name": "Pikachu", "img": "/assets/avatars/pikachu.png" },
    { "name": "Sonic", "img": "/assets/avatars/sonic.png" },
    { "name": "Spiderman", "img": "/assets/avatars/spiderman.png" },
    { "name": "Spongebob", "img": "/assets/avatars/spongebob.png" },
    { "name": "Luigi", "img": "/assets/avatars/luigi.png" },
  ]

  constructor(
    private socketService: SocketsService
  ){

  }

  
  ngOnInit() {
    this.history = false;

    this.socketService.syncMessages("change_screens").subscribe(()=> {
      this.show = true;
    })
  }

  booleanValue = true;

  showhistory() {
    console.log(this.history);
    this.history = !this.history
    console.log(this.history);
  }

  put(img, name) {
    this.img = img;
    this.name = name;
    for (var i = 0; i < Object.keys(this.players).length; i++) {
      if (this.players[i].img === this.img) {
        if (i == 0) {
           this.prev=this.players[Object.keys(this.players).length - 1]; 
           this.next=this.players[i+1];
           break;
          }
        if (i == Object.keys(this.players).length - 1) {
          this.prev=this.players[i-1]; 
          this.next=this.players[0];
          break;  
          }
          this.prev=this.players[i-1];
          this.next=this.players[i+1];
      }
    }
  }

  messagesfromnext(event) {
    console.log(event);
    this.put(event.img,event.name);
  }

  messagesfromexit(event) {
    this.history = false;
  }

}
