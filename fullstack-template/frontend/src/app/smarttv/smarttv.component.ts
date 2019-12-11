import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './smarttv.component.html',
  styleUrls: ['./smarttv.component.scss']
})
export class SmarttvComponent {

  public history:boolean;
  public img: string;
  public name: string;

  title = 'smarttv';

  ngOnInit() {
    this.history=false;
  }

  booleanValue = true;

  showhistory(){
    console.log(this.history);
    this.history=!this.history
    console.log(this.history);
  }

  put(img,name){
    this.img=img;
    this.name=name;
    console.log(name);
  }

  messagesfromexit(event) {
    this.history = false;
  }

}
