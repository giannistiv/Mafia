import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'ami-fullstack-vote-box',
  templateUrl: './vote-box.component.html',
  styleUrls: ['./vote-box.component.scss']
})
export class VoteBoxComponent implements OnInit {

  @Input() inputWidth;
  @Input() inputColor;
  @Input() inputName;
  
  style:any= {}
  
  constructor() { }
  
  ngOnInit() {
    this.style = {
           "width": this.inputWidth,
           "background-color" : this.inputColor
    }
    console.log(this.inputColor , this.inputWidth)
  }

}
