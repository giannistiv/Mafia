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


  addPlayer(username , charname){
    var player = {
      "username" : username,
      "char" : {"name" : charname , "img" : undefined , "color" : undefined},
      "votes" : 0,
      "voted" : [],
      "votedBy" : []
    }

    this.requestService.addPlayer(player).then((data) => console.log(data)).catch(err => console.log(err));
  }


  startGame(){
    this.requestService.startGame().then((data) => console.log(data)).catch(err => console.log(err));
  }

  vote(player){
    this.votingService.votePlayer(player).then((data) => console.log(data)).catch((err) => console.error(err));
    console.log(player);
  }

  getVoting(){
    this.votingService.getResult().then((data) => console.log(data)).catch((err) => console.error(err));
  }
}
