import { Component } from '@angular/core';
import { SocketsService } from '../global/services';
import { RequestService } from '../services/request.service';
import { NameService } from '../services/name.service';
import { SmartSpeakerService } from "../smart-speaker.service";

@Component({
  selector: 'app-root',
  templateUrl: './smarttv.component.html',
  styleUrls: ['./smarttv.component.scss']
})
export class SmarttvComponent {

  public history: boolean;
  public qrcode: boolean;
  public img: string;
  public name: string;
  public prev;
  public next;
  public show;
  title = 'smarttv';

  players = [
    // { "name": "Batman", "img": "/assets/avatars/batman.png" },
    // { "name": "DeadPool", "img": "/assets/avatars/deadpool.png" },
    // { "name": "Iron Man", "img": "/assets/avatars/ironman.png" },
    // { "name": "Mario", "img": "/assets/avatars/mario.png" },
    // { "name": "Pikachu", "img": "/assets/avatars/pikachu.png" },
    // { "name": "Sonic", "img": "/assets/avatars/sonic.png" },
    // { "name": "Spiderman", "img": "/assets/avatars/spiderman.png" },
    // { "name": "Spongebob", "img": "/assets/avatars/spongebob.png" },
    // { "name": "Luigi", "img": "/assets/avatars/luigi.png" },
  ]

  personalData :any = {};
  
  constructor(
    private socketService: SocketsService,
    private requestService : RequestService,
    private nameService : NameService,
    private smartSpeaker : SmartSpeakerService,
  ){

  }

  
  ngOnInit() {
    this.history = false;
    this.qrcode=false;

    this.socketService.syncMessages("change_screens").subscribe(()=> {
      this.show = true;
    })
    this.personalData  = this.nameService.getPersonalData();
    console.log(this.personalData);
    this.requestService.getPlayers().then((player : any[]) => {
      console.log(player);
      this.players = player;
    })


    console.log("Mafia start")
    this.smartSpeaker.speak("Do you want to play a game?" , () => {
      console.log("Done");
    })

    this.smartSpeaker.addCommand('Start Mafia' , () => {
      this.qrcode=!this.qrcode;
      this.smartSpeaker.speak("Please scan the QR code to enter the game!" , () => {});
    })

    this.smartSpeaker.addCommand("Okay let's play" , () => {
      this.qrcode=!this.qrcode;
      this.smartSpeaker.speak("Thank you, Have fun" , () => {});
    })



    this.smartSpeaker.addCommand('can you tell me the time' , () => {
      this.smartSpeaker.speak("Look at your watch motherfucker bitch, GUARD" , () => {});
    })

  }

  booleanValue = true;

  showhistory() {
    // var Jarvis = new SmartSpeakerService;
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
