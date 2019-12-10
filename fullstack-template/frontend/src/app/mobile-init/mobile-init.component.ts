import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { SocketsService } from '../global/services';
import { RequestService } from '../services/request.service';

@Component({
  selector: 'ami-fullstack-mobile-init',
  templateUrl: './mobile-init.component.html',
  styleUrls: ['./mobile-init.component.scss']
})
export class MobileInitComponent implements OnInit {

  public isViewable: boolean;
  

  constructor(
    private socketService : SocketsService,
    private requestService : RequestService,
    private cdr : ChangeDetectorRef
  ) {}

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


  opacityStyle = {
    "opacity" : 0.5
  }

  ngOnInit() {
    this.requestService.getAvailableIcons().then((icons : any) => {
      console.log(icons);
      this.avatars = icons;
    })


    this.isViewable = true;
    this.socketService.syncMessages("icons_on_change").subscribe((data : any) => {
      this.avatars = data.message;
      console.log(this.avatars);

      this.avatars.forEach((icon:any) => {
        if(!icon.available){
          console.log(document.getElementById(icon.name))
          document.getElementById(icon.name).style.opacity = "0.2"
        }
        this.cdr.detectChanges();
      })
    })
    
  }

  public ready(): void
   {
      this.isViewable = !this.isViewable; 
   }

   messagesfrominit2(event){
    this.isViewable = !this.isViewable;
   }


   iconSelected(name){
     console.log(name);


     const pressedImage = document.getElementById(name);
    pressedImage.style.border = "2px solid green";
   }



  

}
