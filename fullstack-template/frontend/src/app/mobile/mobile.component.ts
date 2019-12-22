import { Component, OnInit } from '@angular/core';
import { RequestService } from '../services/request.service';
import { NameService } from '../services/name.service';
import { VotingService } from '../services/voting.service';
import { SocketsService } from '../global/services';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';

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
  public img: string = "assets/none.png";
  public name:string;
  public personHistory : any;
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
    // this.personalData = {
    //   "username": "Sonic Bot",
    //   "char": {
    //     "name": "Sonic",
    //     "img": "assets/avatars/sonic.png",
    //     "color": "blue"
    //   },
    //   "votes": 0,
    //   "width": "0vw",
    //   "voted": [],
    //   "votedBy": [],
    //   "role": {
    //     "name": "Masons",
    //     "img": "assets/roles/masons.png",
    //     "info": "Masons are secretive and hidden in the shadows. They blend in the crowds, hidden by their anonymity             and trusting only their own. But this anonimity may have to be lost in order to help this town in the upcoming             battle",
    //     "ability": "Masons know each other. They seem like pawns in this grand game of chess, but with their             knowledge they know more than anyone else"
    //   },
    //   "history": {
    //     "ByRound": [
    //       {
    //         "round": 1,
    //         "voted": [
    //           {
    //             "name": "Iron Man",
    //             "img": "assets/avatars/ironman.png",
    //             "color": "orange"
    //           },
    //           {
    //             "name": "Iron Man",
    //             "img": "assets/avatars/ironman.png",
    //             "color": "orange"
    //           }
    //         ],
    //         "votedBy": []
    //       }
    //     ],
    //     "ByChar": []
    //   },
    //   "alive": true
    // }
    console.log(this.personalData);
    this.requestService.getPlayers().then((player : any[]) => {
      console.log(player);
      this.players = player.filter(elem => elem.username != this.personalData.username);
      // this.showVoteList = false;
    })


    this.socketService.syncMessages("open_doctor").subscribe((data) => {
      if(this.personalData.role.name == "Doctor"){
        // this.ability = true;
        this.day = false;
        console.log("I am the doctor");
      }
    })

    this.socketService.syncMessages("deletion_made").subscribe((data) => {
      this.players = data.message.filter(elem => elem.username != this.personalData.username);
    })

    this.socketService.syncMessages("next_round").subscribe((data) => {
      this.showVoteList = true;
    })

    
    this.socketService.syncMessages("history_made").subscribe((data) => {
      console.log(data);
      var person = data.message.filter(elem => elem.char.name == this.nameService.getPersonalData().char.name)
      if(person.length != 0) this.personHistory = person[0].history.ByChar;
      console.log(this.players);
    })

    this.socketService.syncMessages("doctor_voted").subscribe((data) => {
      this.showVoteList = false;
    })

    this.socketService.syncMessages("next_round").subscribe(() => {
        this.vote=false;
        this.requestService.getPlayers().then((player : any[]) => {
          console.log(player);
          this.players = player.filter(elem => elem.username != this.personalData.username);
          this.img = "assets/none.png";
          // this.showVoteList = false;
        })
        
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
      this.requestService.protected(event.name)
      this.ability=false;
      this.vote=true;
      this.day!=this.day;
    }
  }

  messagesfrominit2(event){
    this.vote = false;
    this.ability = false;
    this.requestService.removeVote(this.personalData.char.name , this.name)
  }

  messagesfromability($event){
    this.ability=true;
    this.day=!this.day;
    this.vote = false;
    this.personalData  = this.nameService.getPersonalData();
    console.log(this.personalData);
    this.requestService.getPlayers().then((player : any[]) => {
      console.log(player);
      this.players = player
    })


  }


}