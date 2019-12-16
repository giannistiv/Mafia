import { Component, EventEmitter , OnInit , Input, Output } from '@angular/core';

@Component({
  selector: 'ami-fullstack-mobile-bottom',
  templateUrl: './mobile-bottom.component.html',
  styleUrls: ['./mobile-bottom.component.scss']
})
export class MobileBottomComponent implements OnInit {

  constructor() { }
  @Input() image : String;
  @Input() name : String;
  @Output() votingMessager = new EventEmitter();
  ngOnInit() {
  }


  onVotePressed(){
    console.log("Voted")
    this.votingMessager.emit({"img" : this.image , "event" : "votePressed" , "name": this.name});
  }

}
