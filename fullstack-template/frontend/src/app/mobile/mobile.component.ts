import { Component, OnInit } from '@angular/core';
import { RequestService } from '../services/request.service';
import { NameService } from '../services/name.service';
import { VotingService } from '../services/voting.service';
import { SocketsService } from '../global/services';

@Component({
  selector: 'ami-fullstack-mobile',
  templateUrl: './mobile.component.html',
  styleUrls: ['./mobile.component.scss']
})
export class MobileComponent implements OnInit {

  public bio: boolean;
  public day: boolean;
  public history: boolean;
  public vote: boolean;
  public ability: boolean;
  public img: string;
  public name:string
  constructor(
    private requestService : RequestService,
    private nameService : NameService,
    private votingService : VotingService,
    private socketService : SocketsService
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

  personalData :any = {};
  showVoteList = false;
  ngOnInit() {
    this.bio = false;
    this.day = true;
    this.history = false;
    this.vote=false;
    this.ability= false;

    this.personalData  = this.nameService.getPersonalData();
    console.log(this.personalData);
    this.requestService.getPlayers().then((player : any[]) => {
      console.log(player);
      this.players = player.filter(elem => elem.username != this.personalData.username);
      // this.showVoteList = false;
    })


    this.socketService.syncMessages("open_doctor").subscribe((data) => {
      if(this.personalData.role.name == "Doctor"){
        this.ability = true;
      }
    })

    this.socketService.syncMessages("deletion_made").subscribe((data) => {
      this.players = data.message.filter(elem => elem.username != this.personalData.username);
    })

    this.socketService.syncMessages("next_round").subscribe((data) => {
      this.showVoteList = true;
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
    this.name = event.name;
    console.log(event);
  }

  messagesfrombottom(event){
    if(event.event == "votePressed"){
      console.log("Player" , this.nameService.getPersonalData().char.name , "votes" , event.name);
      this.votingService.votePlayer(event.name)
      this.vote=true;
    }
    if(event.event == "abilityPressed"){
      console.log("Player" , this.nameService.getPersonalData().char.name , "used ability to" , event.name);
      this.votingService.votePlayer(event.name)
      this.ability=false;
      this.day!=this.day;
    }
  }

  messagesfrominit2(event){
    this.vote = false;
    this.requestService.removeVote(this.personalData.char.name , this.name)
  }

  messagesfromability($event){
    this.ability=true;
    this.day=!this.day;

    this.personalData  = this.nameService.getPersonalData();
    console.log(this.personalData);
    this.requestService.getPlayers().then((player : any[]) => {
      console.log(player);
      this.players = player
    })


  }


}