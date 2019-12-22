import { Component, OnInit } from '@angular/core';
import { THIS_EXPR, IfStmt } from '@angular/compiler/src/output/output_ast';
import { SocketsService } from '../global/services';
import { RequestService } from '../services/request.service';

@Component({
  selector: 'ami-fullstack-smarttable',
  templateUrl: './smarttable.component.html',
  styleUrls: ['./smarttable.component.scss']
})
export class SmarttableComponent implements OnInit {

  constructor(
    private socketService : SocketsService,
    private requestService : RequestService
  ) {
   }

  showUi = false;
  mouseX = 0;
  mouseY = 0;
  mutexTime = 1;
  buttonScrollHeight = 200;
  showCemetery = false;
  showWasted = false;
  showGraph = true;
  show = false;

  thisRoundDeadPerson = {
    "name" : "Iron Man",
    "img"  : "assets/avatars/ironman.png",
    "role" : "assets/avatars/spiderman.png"
  }
  wastedImgStyle = {
    "width":"400px",
    "height":"400px"
  }

  players = [];

  coordinates(event){
    if(this.mutexTime == 1 && this.showCemetery == false){
      this.showUi = true;
    }
    

    console.log(event.screenX , event.screenY)
    this.mouseX = event.pageX;
    this.mouseY = event.pageY;
  }


  ngOnInit() {

    this.socketService.syncMessages("change_screens").subscribe(() => {
      this.show = true;
      this.requestService.getVotingResults().then((results :any) => { this.players = results , console.log(this.players)}).catch((err) => console.error(err));
    })


    this.socketService.syncMessages("voting_on_change").subscribe((results : any) => {
      this.players = results.message;
    })

    this.socketService.syncMessages("next_round").subscribe((data) => {
      this.players = data.message;
      this.showGraph = true;
      this.showWasted = false;
    })

    this.socketService.syncMessages("on_death").subscribe((rip : any) => {
      console.log("RIP" , rip.message);
      this.thisRoundDeadPerson = rip.message;
      this.showWasted = true;
      this.showGraph = false;
      
    })
  }


  messagesFromUI(event){
    console.log("[HandUI] Got " + event);
    if(event == "closeUi"){
      this.showUi = false;
      this.mutexTime = 0;
      setTimeout(() => {
        this.mutexTime = 1
      } , 500)
    }else if(event == "showCemetery"){
      this.showCemetery = true;
      this.showUi = false;
      const scrollDiv = document.getElementById('containerDiv');
      scrollDiv.scrollTop = 0;
      this.mutexTime = 0;
      setTimeout(() => {
        this.mutexTime = 1
      } , 500)
    }else if(event == "up"){

      const scrollDiv = document.getElementById('containerDiv');
      scrollDiv.scrollTop = scrollDiv.scrollTop - this.buttonScrollHeight;
      this.mouseX = this.mouseX - 100;

    }else if(event == "down"){

      const scrollDiv = document.getElementById('containerDiv');
      scrollDiv.scrollTop = scrollDiv.scrollTop + this.buttonScrollHeight;
      console.log(scrollDiv.scrollTop);
    }

    console.log(event);
  }


  messagesFromCemetery(event){
    console.log("[Cemetery] Got " +  event)

    if(event == "close"){
      this.showCemetery = false;
      this.mutexTime = 0;
      setTimeout(() => {
        this.mutexTime = 1
      } , 500)
    }
  }

}
