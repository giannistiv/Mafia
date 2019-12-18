import { Component } from '@angular/core';
import { SocketsService } from '../global/services';
import { RequestService } from '../services/request.service';
import { NameService } from '../services/name.service';
<<<<<<< HEAD
import { SmartSpeakerService } from '../smart-speaker.service';
import { MafiaSmartSpeakerService } from '../services/smart.speaker.service';
=======
import { SmartSpeakerService } from "../smart-speaker.service";
>>>>>>> GazisNew

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
<<<<<<< HEAD
    private smartSpeaker: SmartSpeakerService,
    private mafiaspeaker : MafiaSmartSpeakerService
=======
    private smartSpeaker : SmartSpeakerService,
>>>>>>> GazisNew
  ){
  }

  
  ngOnInit() {
    this.history = false;
    this.qrcode=false;

    this.mafiaspeaker.initRandomQuestions();

    this.socketService.syncMessages("end_Round").subscribe((data) => {
        this.mafiaspeaker.endofroundScript();
    })

  
    this.socketService.syncMessages("change_screens").subscribe(()=> {
      this.show = true;
    })
    
    this.personalData  = this.nameService.getPersonalData();
    console.log(this.personalData);
    this.requestService.getPlayers().then((player : any[]) => {
      console.log(player);
      this.players = player;
    })
      



    // this.smartSpeaker.speak("Welcome to the Mafia game" , () => {})

    // this.smartSpeaker.addCommand(['Phase 1' , 'Start Game'], () => {
    //   this.smartSpeaker.speak("Welcome to Mafia, my name is Alfred and I will be your host for today", () => { });
    //   this.smartSpeaker.speak("Say Alfred help, for a list of commands that I can assist you with", () => { });
    //   this.smartSpeaker.speak("But first, choose your name and avatar in your mobile device", () => { });
    // })

    // this.smartSpeaker.addCommand(['yelp', 'help', 'shelf'], () => {
    //   this.smartSpeaker.speak("Help instructions follow", () => { });  //have to add some help commands, like how many are alive, and who died in the last round
    // })

    // this.smartSpeaker.addCommand(['Phase 2' , 'We are ready'], () => {
    //   this.smartSpeaker.speak("The game is ready to start", () => { });
    //   this.smartSpeaker.speak("A role has been assigned to you", () => { });
    //   this.smartSpeaker.speak("You can see that role by pressing the button in the top left corner of your phone", () => { });
    // })

    // this.smartSpeaker.addCommand(['Phase 3'], () => {
    //   this.smartSpeaker.speak("The game is about to begin", () => { });
    //   this.smartSpeaker.speak("Please, everyone close your eyes", () => { });
    //   setTimeout(()=>{this.smartSpeaker.speak("Masons open your eyes so that you know each other", () => { });}, 10000);
    //   setTimeout(()=>{this.smartSpeaker.speak("Masons close your eyes", () => { });}, 30000);
    //   setTimeout(()=>{this.smartSpeaker.speak("Mafiosi open your eyes so that you know each other", () => { });}, 35000);
    //   setTimeout(()=>{this.smartSpeaker.speak("Mafiosi close your eyes", () => { });}, 55000);
    //   setTimeout(()=>{this.smartSpeaker.speak("All Mafiosi except the Godfather raise your hand", () => { });}, 60000);
    //   setTimeout(()=>{this.smartSpeaker.speak("Merlin open your eyes and see the mafia goons", () => { });}, 68000);
    //   setTimeout(()=>{this.smartSpeaker.speak("Merlin close your eyes", () => { });}, 88000);
    //   setTimeout(()=>{this.smartSpeaker.speak("A new day begins", () => { });}, 93000);
    // })

    // this.smartSpeaker.addCommand(['Phase 4'], () => {
    //   this.smartSpeaker.speak("The votes have been casted and the first person is dead", () => { });
    //   this.smartSpeaker.speak("It's time for the Mafiosi to try to claim a victim", () => { });
    //   this.smartSpeaker.speak("Please, everyone close your eyes", () => { });
    //   setTimeout(()=>{this.smartSpeaker.speak("Mafiosi open your eyes and decide who do you want to kill", () => { });}, 10000);
    //   setTimeout(()=>{this.smartSpeaker.speak("The Mafia striked", () => { });}, 24000);  //this will be in a different event
    //   setTimeout(()=>{this.smartSpeaker.speak("Mafiosi close your eyes", () => { });}, 25000);
    //   setTimeout(()=>{this.smartSpeaker.speak("Doctor if you want to use your ability to save someone, you can do so now", () => { });}, 30000);
    //   setTimeout(()=>{this.smartSpeaker.speak("The doctor has decided", () => { });}, 48000);
    //   setTimeout(()=>{this.smartSpeaker.speak("Everyone close your eyes", () => { });}, 49000);
    //   setTimeout(()=>{this.smartSpeaker.speak("A new day begins", () => { });}, 55000);
    // })
}

<<<<<<< HEAD
=======

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
>>>>>>> GazisNew

  booleanValue = true;

  shutUp() {
    this.smartSpeaker.stopSpeaker();
  }

  kill() {
    this.smartSpeaker.killSpeaker();
  }

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
          this.prev = this.players[Object.keys(this.players).length - 1];
          this.next = this.players[i + 1];
          break;
        }
        if (i == Object.keys(this.players).length - 1) {
          this.prev = this.players[i - 1];
          this.next = this.players[0];
          break;
        }
        this.prev = this.players[i - 1];
        this.next = this.players[i + 1];
      }
    }
  }

  messagesfromnext(event) {
    console.log(event);
    this.put(event.img, event.name);
  }

  messagesfromexit(event) {
    this.history = false;
  }

}
