import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'ami-fullstack-vote-box',
  templateUrl: './vote-box.component.html',
  styleUrls: ['./vote-box.component.scss']
})
export class VoteBoxComponent implements OnInit {

  @Input() inputWidth :String;
  @Input() inputColor :String;
  @Input() inputName :String;
  widthNumber = 0;
  
  style:any= {}
  
  constructor() { }
  
  ngOnInit() {

    this.widthNumber = +(this.inputWidth.substr(0,2));
    this.style = {
           "width": this.inputWidth,
           "background-color" : this.inputColor
    }
    console.log(this.inputColor , this.inputWidth)
  }

}
