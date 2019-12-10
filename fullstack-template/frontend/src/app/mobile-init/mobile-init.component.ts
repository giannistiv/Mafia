import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'ami-fullstack-mobile-init',
  templateUrl: './mobile-init.component.html',
  styleUrls: ['./mobile-init.component.scss']
})
export class MobileInitComponent implements OnInit {

  public isViewable: boolean;
  

  constructor() {}

  avatars = [
    {"img": "assets/avatars/deadpool.png" },
    {"img": "assets/avatars/pikachu.png" },
    {"img": "assets/avatars/ironman.png" },
    {"img": "assets/avatars/spiderman.png" },
    {"img": "assets/avatars/mario.png" },
    {"img": "assets/avatars/sonic.png" },
    {"img": "assets/avatars/luigi.png" },
    {"img": "assets/avatars/batman.png" },
    {"img": "assets/avatars/spongebob.png" },
  ]

  ngOnInit() {
    this.isViewable = true;
  }

  public ready(): void
   {
      this.isViewable = !this.isViewable; 
   }

   messagesfrominit2(event){
    this.isViewable = !this.isViewable;
   }
  

}
