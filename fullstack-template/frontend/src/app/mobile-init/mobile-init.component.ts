import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { SocketsService } from '../global/services';
import { RequestService } from '../services/request.service';
import { Router } from '@angular/router';
import { NameService } from '../services/name.service';

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
    private cdr : ChangeDetectorRef,
    private router : Router,
    private nameService : NameService
  ) {}

  serverAvatars = [];
  avatars = []
  selected = undefined;
  username = undefined;
  selectedObject = undefined;
  playerInfo = undefined;

  opacityStyle = {
    "opacity" : 0.5
  }

  ngOnInit() {
    this.requestService.getAvailableIcons().then((icons : any) => {
      console.log(icons);
      this.avatars = icons;
      this.serverAvatars = icons;

    })


    this.isViewable = true;
    this.socketService.syncMessages("icons_on_change").subscribe((data : any) => {
      if(this.isViewable){
        this.serverAvatars = data.message;
        // this.avatars = data.message;
        console.log(this.serverAvatars);
  
        this.serverAvatars.forEach((icon:any) => {
          if(!icon.available){
            document.getElementById(icon.name).style.opacity = "0.2"
          }else{
            document.getElementById(icon.name).style.opacity = "1"
          }
          this.cdr.detectChanges();
        })
      }
    })


  this.socketService.syncMessages("change_screens").subscribe(() => {
    this.router.navigateByUrl("/mobile");
  })

    this.socketService.syncMessages("start_game").subscribe(() => {
      console.log("adding player" , this.playerInfo);
      this.nameService.setPersonalData(this.playerInfo);
      this.requestService.addPlayer(this.playerInfo).then((data) => console.log(data)).catch(err => console.error(err));
    })
    
  }

  public ready(): void
   {
      this.isViewable = !this.isViewable;
      console.log(this.username);
      console.log(this.selectedObject);

      this.playerInfo = {
        "username" : this.username,
        "char" : {"name" : this.selectedObject.name , "img" : this.selectedObject.img , "color" : this.selectedObject.color},
        "votes" : 0,
        "voted" : [],
        "votedBy" : []
      }

      this.requestService.reserve(this.playerInfo.char.img).then((data) => console.log("reserver" , data)).catch(err => console.error(err));

   }

   messagesfrominit2(event){
    this.isViewable = !this.isViewable;
    this.requestService.unreserve(this.playerInfo.char.img).then((data) => {
      console.log("Came from unreserve" , data);

      this.selected = undefined;
      this.selectedObject = undefined;
      this.playerInfo = undefined;
      this.cdr.detectChanges();
  
      this.requestService.getAvailableIcons().then((icons : any) => {
        console.log(icons);
        this.avatars = icons;
        this.serverAvatars = icons;
  
        this.avatars.forEach((icon) => {
          const item = document.getElementById(icon.name);
          if(!icon.available){
            item.style.opacity = "0.2";
          }else{
            item.style.opacity = "1"
          }
          this.cdr.detectChanges();
        })
      })
    })
   }


   iconSelected(name){
     console.log(name);
     if(this.selected == undefined){
       this.selected = name;
       const pressedImageImg = document.getElementById(name + "_img");
       pressedImageImg.style.boxShadow = "0px 0px 32px green";
       pressedImageImg.style.border = "3px solid green";
       pressedImageImg.style.borderRadius = "50%"
       this.disableAllOther(name);
       this.cdr.detectChanges(); 

       
        this.avatars.forEach((icon) => {
          if(icon.name == name){
            this.selectedObject = icon;
          }
        })

     }else if(this.selected == name){
      this.resetIcon();
      this.cdr.detectChanges();
      this.selected = undefined;  
     }



     console.log("username" , this.username);
 
   }


  resetIcon(){

    this.requestService.getAvailableIcons().then((data:any) => {

      this.avatars = data;

      this.avatars.forEach((icon) => {

        const item = document.getElementById(icon.name);
        if(!icon.available){
          item.style.opacity = "0.2";
        }else{
          item.style.opacity = "1"
        }
        
        console.log(icon);
        const pressedImageImg = document.getElementById(icon.name + "_img");
        pressedImageImg.style.boxShadow = "none"
        pressedImageImg.style.border = "none";
        this.cdr.detectChanges();
      })
  
    })

  }


   disableAllOther(name){
     this.avatars.forEach((icon) => {
       if(icon.name == name){
        console.log(icon);
       }else{
         const item = document.getElementById(icon.name);
         item.style.opacity = "0.2";
         icon.available = false;
       }
     })
   }



  

}
1