import { Component, OnInit,Output,EventEmitter, Input } from '@angular/core';

@Component({
  selector: 'ami-fullstack-mobile-ability',
  templateUrl: './mobile-ability.component.html',
  styleUrls: ['./mobile-ability.component.scss']
})
export class MobileAbilityComponent implements OnInit {

  public bio: boolean;
  
  @Output() Abilitymessages= new EventEmitter();
  constructor() { }

  ngOnInit() {
  }

  ability(){
    this.Abilitymessages.emit("ability");
  }

}
