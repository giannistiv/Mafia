import { Component, OnInit, Output } from '@angular/core';
import { EventEmitter } from 'events';

@Component({
  selector: 'ami-fullstack-cemeterypopup',
  templateUrl: './cemeterypopup.component.html',
  styleUrls: ['./cemeterypopup.component.scss']
})
export class CemeterypopupComponent implements OnInit {

  constructor() { }

  @Output() CemeteryMessager = new EventEmitter();

  ngOnInit() {
  }

  close(){
    this.CemeteryMessager.emit("close")
  }

}
