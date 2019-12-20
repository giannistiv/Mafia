import { Component, OnInit } from '@angular/core';
import { SocketsService } from '../global/services';
import { Router } from '@angular/router';
import { RequestService } from '../services/request.service';
import { VotingService } from '../services/voting.service';

@Component({
  selector: 'ami-fullstack-playerschoice',
  templateUrl: './playerschoice.component.html',
  styleUrls: ['./playerschoice.component.scss']
})
export class PlayerschoiceComponent implements OnInit {


  public barman1choise = "assets/none.png";
  public godfatherchoise = "assets/none.png";
  public barman2choise = "assets/none.png";
  constructor(
    private socketService : SocketsService,
    private router : Router,
    private requestService : RequestService,
    private votingService : VotingService
  ) { }




  ngOnInit() {
  

    this.votingService.getResult().then((data) => {
      var first = data[0].char.img;
      var second = data[1].char.img;

      setTimeout(() => {
        this.godfatherchoise = first
        setTimeout(() => {
          this.barman2choise = first
          setTimeout(() => {
            this.barman1choise = second
            setTimeout(() => {
              this.barman1choise = first
              this.requestService.killingDone("Deadpool").then((data)=>console.log(data));
            } , 2000);
          } , 3000)
        } , 2000)
      } , 3000);

    })


    this.socketService.syncMessages("next_round").subscribe(() => {
      this.router.navigateByUrl('/smarttv')
    })

    this.socketService.syncMessages("on_barman_1_kill_vote").subscribe((person : any) => {
        this.barman1choise = person.char.img;
    });
  

    
    this.socketService.syncMessages("on_barman_2_kill_vote").subscribe((person : any) => {
      this.barman2choise = person.char.img;
  });

  
    this.socketService.syncMessages("on_godfather_kill_vote").subscribe((person : any) => {
      this.godfatherchoise = person.char.img;
  });


  // var interval = setInterval(() => {
  //     if ((this.barman1choise == this.barman2choise) == this.godfatherchoise) && (this.barman1choise != undefined)){
  //       clearInterval(interval);
  //       console.log("They agreed on" , this.barman1choise)
  //     }
  //   } , 500)
  }



}
