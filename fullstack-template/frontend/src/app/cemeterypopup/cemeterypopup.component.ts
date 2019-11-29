import { Component, OnInit, Output , EventEmitter } from '@angular/core';


@Component({
  selector: 'ami-fullstack-cemeterypopup',
  templateUrl: './cemeterypopup.component.html',
  styleUrls: ['./cemeterypopup.component.scss']
})
export class CemeterypopupComponent implements OnInit {

  constructor() { }

  @Output() cemeteryMessager = new EventEmitter();

  cemeteryImagesStyle = {
    "width" : "150px",
    "height" : "150px"
  }

  dead = [
    {"img" : "assets/avatars/deadpool.png" , "role" : "assets/avatars/spiderman.png"},
    {"img" : "assets/avatars/deadpool.png" , "role" : "assets/avatars/spiderman.png"},
    {"img" : "assets/avatars/deadpool.png" , "role" : "assets/avatars/spiderman.png"},
    {"img" : "assets/avatars/deadpool.png" , "role" : "assets/avatars/spiderman.png"},
    {"img" : "assets/avatars/deadpool.png" , "role" : "assets/avatars/spiderman.png"},
    {"img" : "assets/avatars/deadpool.png" , "role" : "assets/avatars/spiderman.png"},
    {"img" : "assets/avatars/deadpool.png" , "role" : "assets/avatars/spiderman.png"},
  ]

  ngOnInit() {
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
  }

  close(){
    console.log("Called");
    this.cemeteryMessager.emit("close")
  }



}
