import { Component, OnInit,Output,EventEmitter } from '@angular/core';
import { SocketsService } from '../global/services';
import { RequestService } from '../services/request.service';

@Component({
  selector: 'ami-fullstack-mobile-history',
  templateUrl: './mobile-history.component.html',
  styleUrls: ['./mobile-history.component.scss']
})
export class MobileHistoryComponent implements OnInit {

  constructor(
    private socketService : SocketsService,
    private requestService : RequestService
  ) { }

  show = false;

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

  ngOnInit() {

    this.socketService.syncMessages("change_screens").subscribe(() => {
      this.show = true;
      this.requestService.getVotingResults().then((results :any) => { this.players = results , console.log(this.players)}).catch((err) => console.error(err));
    })


    this.socketService.syncMessages("voting_on_change").subscribe((results : any) => {
      console.log(results.message);
      this.players = results.message;
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
