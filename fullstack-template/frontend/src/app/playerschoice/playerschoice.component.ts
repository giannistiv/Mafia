import { Component, OnInit } from '@angular/core';
import { SocketsService } from '../global/services';
import { Router } from '@angular/router';

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
    private router : Router
  ) { }




  ngOnInit() {
  

    setTimeout(() => {
      this.barman2choise = "assets/avatars/deadpool.png"
      setTimeout(() => {
        this.godfatherchoise = "assets/avatars/deadpool.png"
        setTimeout(() => {
          this.barman1choise = "assets/avatars/sonic.png"
          setTimeout(() => {
            this.barman1choise = "assets/avatars/deadpool.png";
          } , 2000);
        } , 3000)
      } , 2000)
    } , 3000);


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
