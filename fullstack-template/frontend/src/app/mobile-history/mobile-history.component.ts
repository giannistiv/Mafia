import { Component, OnInit,Output,EventEmitter, Input } from '@angular/core';
import { SocketsService } from '../global/services';
import { RequestService } from '../services/request.service';
import { NameService } from '../services/name.service';

@Component({
  selector: 'ami-fullstack-mobile-history',
  templateUrl: './mobile-history.component.html',
  styleUrls: ['./mobile-history.component.scss']
})
export class MobileHistoryComponent implements OnInit {

  constructor(
    private socketService : SocketsService,
    private requestService : RequestService,
    private nameService : NameService
  ) {
    console.log("createdd");
   }

  show = false;

  @Input() history;

  @Output() ExitMessage= new EventEmitter();

  players = [
    // {"name": "DeadPool", "img": "assets/avatars/deadpool.png" },
    // {"name": "Pikachu", "img": "assets/avatars/pikachu.png" },
    // {"name": "Iron Man", "img": "assets/avatars/ironman.png" },
    // {"name": "Spiderman", "img": "assets/avatars/spiderman.png" },
    // {"name": "Mario", "img": "assets/avatars/mario.png" },
    // {"name": "Luigi", "img": "assets/avatars/luigi.png" },
    // {"name": "Batman", "img": "assets/avatars/batman.png" },
    // {"name": "Sonic", "img": "assets/avatars/sonic.png" },
    // {"name": "Spongebob", "img": "assets/avatars/spongebob.png" },
  ]

  // dummy = {
  //   "ByRound": [
  //     {
  //       "round": 1,
  //       "voted": [
  //         {
  //           "name": "Iron Man",
  //           "img": "assets/avatars/ironman.png",
  //           "color": "orange"
  //         },
  //         {
  //           "name": "Iron Man",
  //           "img": "assets/avatars/ironman.png",
  //           "color": "orange"
  //         }
  //       ],
  //       "votedBy": []
  //     }
  //   ],
  //   "ByChar": [
  //     {"name" : "elemVotedBy.name" , "img" : "assets/avatars/deadpool.png" , "totalVotes": 3 , "rounds" : [1 , 3 , 5]},
  //     {"name" : "elemVotedBy.name" , "img" : "assets/avatars/deadpool.png" , "totalVotes": 2 , "rounds" : [1 ,2 ,4]},
  //     {"name" : "elemVotedBy.name" , "img" : "assets/avatars/deadpool.png" , "totalVotes": 1 , "rounds" : [2 , 4, 5]}
  //   ]
  // }

  ngOnInit() {


    console.log(this.history);
    this.players = this.history
    // this.players = this.dummy.ByChar
    // console.log("Players" , this.players);
    this.socketService.syncMessages("change_screens").subscribe(() => {
      this.show = true;
      this.requestService.getVotingResults().then((results :any) => { this.players = results , console.log(this.players)}).catch((err) => console.error(err));
    })


    this.socketService.syncMessages("voting_on_change").subscribe((results : any) => {
      console.log(results.message);
      this.players = results.message;
    })


    this.socketService.syncMessages("history_made").subscribe((data) => {
      debugger;
      var person = data.message.filter(elem => elem.char.name == this.nameService.getPersonalData().char.name)
      this.players = person.history.ByChar;
      console.log(this.players);
    })



  }
  
  exit(){
    this.ExitMessage.emit("exit");
  }

  drop(name){
    if(document.getElementById(name.name).style.display === ''){
      document.getElementById(name.name).style.display = 'block';
    }else if(document.getElementById(name.name).style.display === 'block'){
      document.getElementById(name.name).style.display = '';
    }
  }

}
