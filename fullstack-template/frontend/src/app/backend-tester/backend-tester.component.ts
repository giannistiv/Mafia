import { Component, OnInit } from '@angular/core';
import { RequestService } from '../services/request.service'
import { SocketsService } from 'src/app/global/services';
import { VotingService } from '../services/voting.service';
import { NameService } from '../services/name.service';

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
              private nameService: NameService
              ) { }

  ngOnInit() {

    console.log(this.socketService.isConnected());
    this.socketService.initAndConnect();

    this.socketService.syncMessages("icons_on_change").subscribe((data) => console.log(data))
    this.socketService.syncMessages("voting_on_change").subscribe((data) => console.log(data))


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


  addPlayer(username , charname, img , color){

    var playerInfo = {
      "username" : username,
      "char" : {"name" : charname , "img" : img , "color" : color},
      "votes" : 0,
      "width" : "0vw",
      "voted" : [],
      "votedBy" : [],
      "history" : {
        "ByRound" : [],
        "ByChar" : []
      }
    }

    this.playersToBeAdded.push(playerInfo);
    this.requestService.reserve(playerInfo.char.img).then((data) => console.log("reserver" , data)).catch(err => console.error(err));
  }


  startGame(){
    this.requestService.startGame().then((data) => console.log(data)).catch(err => console.log(err));
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
