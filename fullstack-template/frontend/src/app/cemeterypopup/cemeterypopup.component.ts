import { Component, OnInit, Output , EventEmitter } from '@angular/core';
import { RequestService } from '../services/request.service';


@Component({
  selector: 'ami-fullstack-cemeterypopup',
  templateUrl: './cemeterypopup.component.html',
  styleUrls: ['./cemeterypopup.component.scss']
})
export class CemeterypopupComponent implements OnInit {

  constructor(
    private requestService : RequestService
  ) { }

  @Output() cemeteryMessager = new EventEmitter();
  public night: boolean;

  cemeteryImagesStyle = {
    "width" : "150px",
    "height" : "150px"
  }

  dead = [
    // {
    //   "username": "ktsirakos",
    //   "char": {
    //     "name": "Pikachu",
    //     "img": "assets/avatars/pikachu.png",
    //     "color": "yellow"
    //   },
    //   "votes": 0,
    //   "width": "0vw",
    //   "voted": [],
    //   "votedBy": [],
    //   "role": {
    //     "name": "Doctor",
    //     "img": "assets/roles/doctor.png",
    //     "descrition": "Allied with the Innocents, the Doctor role protects others at night."
    //   },
    //   "history": {
    //     "ByRound": [],
    //     "ByChar": []
    //   }
    // },
    // {
    //   "username": "ktsirakos",
    //   "char": {
    //     "name": "Deadpool",
    //     "img": "assets/avatars/deadpool.png",
    //     "color": "red"
    //   },
    //   "votes": 0,
    //   "width": "0vw",
    //   "voted": [],
    //   "votedBy": [],
    //   "role": {
    //     "name": "Doctor",
    //     "img": "assets/roles/doctor.png",
    //     "descrition": "Allied with the Innocents, the Doctor role protects others at night."
    //   },
    //   "history": {
    //     "ByRound": [],
    //     "ByChar": []
    //   }
    // }

    
  ]

  ngOnInit() {


    this.night=false;
    const container = document.getElementById('gridContainer');
    
    this.requestService.getDeadData().then((data :any[]) => {
  
      this.dead = data;
      var arraysize = this.dead.length;

      const container = document.getElementById('gridContainer');
      var arraysize = this.dead.length;

      if(arraysize > 4) {
        arraysize = 4;
        const overlayContainer = document.getElementById('secondoverlay');
        overlayContainer.style.top = "8vh";
      }

      var sizeOfEachCollumnString = (100 / arraysize) + "%";
      console.log(sizeOfEachCollumnString);

      var gridCollumnsString = ""
      for(var i = 0; i < arraysize; i++){
        gridCollumnsString = gridCollumnsString + sizeOfEachCollumnString + " ";
      }

      console.log(gridCollumnsString);

      container.style.gridAutoColumns = gridCollumnsString
    })
  }

  close(){
    this.cemeteryMessager.emit("close")
  }



}
