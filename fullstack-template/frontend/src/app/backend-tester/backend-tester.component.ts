import { Component, OnInit } from '@angular/core';
import { RequestService } from '../services/request.service'
import { SocketsService } from 'src/app/global/services';
import { VotingService } from '../services/voting.service';
import { NameService } from '../services/name.service';
import { MafiaSmartSpeakerService } from '../services/smart.speaker.service';

@Component({
  selector: 'ami-fullstack-backend-tester',
  templateUrl: './backend-tester.component.html',
  styleUrls: ['./backend-tester.component.scss']
})
export class BackendTesterComponent implements OnInit {


  playersToBeAdded = [];
  constructor(
              private requestService: RequestService,
              private socketService: SocketsService,
              private votingService: VotingService,
              private nameService: NameService,
              // private mafiaspeaker : MafiaSmartSpeakerService
              ) { }

  ngOnInit() {

    this.socketService.initAndConnect();

    
    this.socketService.syncMessages("end_Round").subscribe((data) => {
      // this.mafiaspeaker.endofroundScript();

      this.requestService.die().then((data) => {
        console.log(data)
        setTimeout(() => {
          this.requestService.die().then((data) => {
            console.log(data)
            setTimeout(() => this.requestService.nextRound() , 5000);
        })
       } , 5000)
      }).catch((err) => console.error(err));

  })

    this.socketService.syncMessages("icons_on_change").subscribe((data) => console.log(data))
    this.socketService.syncMessages("voting_on_change").subscribe((data) => console.log(data))

    // this.mafiaspeaker.initRandomQuestions();


    this.socketService.syncMessages("start_game").subscribe(() => {
      this.playersToBeAdded.forEach((elem) => {
        this.requestService.addPlayer(elem).then((data) => console.log(data)).catch(err => console.error(err));
      })
    })
  }


  testRunningServer(){
    this.requestService.checkServerRunning().then((data) => console.log(data)).catch(err => console.log(err));
  }


  getAvailableIcons(){
    this.requestService.getAvailableIcons().then(data => console.log(data)).catch(err => console.log(err));
  }

  getPlayers(){
    this.requestService.getPlayers().then(data => console.log(data)).catch(err => console.log(err));
  }


  startInit(){
    // this.mafiaspeaker.initScript();
  }


  addPlayer(username , charname, img , color){

    this.requestService.getRandomRole(charname).then((role) => {
      var playerInfo = {
        "username" : username,
        "char" : {"name" : charname , "img" : img , "color" : color},
        "votes" : 0,
        "width" : "0vw",
        "voted" : [],
        "votedBy" : [],
        "role" : role,
        "history" : {
          "ByRound" : [],
          "ByChar" : []
        },
        "alive" : true
      }
  
      this.playersToBeAdded.push(playerInfo);
      this.requestService.reserve(playerInfo.char.img).then((data) => console.log()).catch(err => console.error(err));
    })
  }


  startGameScript(){
    this.requestService.startGame().then((data) => console.log(data)).catch(err => console.log(err));
    // this.mafiaspeaker.readyPlayersScript();
  }

  vote(voter , votee){

    this.requestService.vote(voter , votee).then((data) => console.log(data)).catch(err => console.error(err));
    console.log(voter , "->" , votee);

    // this.votingService.votePlayer(player).then((data) => console.log(data)).catch((err) => console.error(err));
  }

  getVoting(){
    this.votingService.getResult().then((data) => console.log(data)).catch((err) => console.error(err));
  }
}
