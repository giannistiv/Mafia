import { Component, OnInit,Output,EventEmitter, Input } from '@angular/core';

@Component({
  selector: 'ami-fullstack-mobile-phase',
  templateUrl: './mobile-phase.component.html',
  styleUrls: ['./mobile-phase.component.scss']
})
export class MobilePhaseComponent implements OnInit {

  constructor() { }

  @Input() ability:boolean;


  phase = [
    {"name":"Vote"},
    {"name":"Protect"},
    {"name":"Kill"},
  ]

  ngOnInit() {
  }

}
