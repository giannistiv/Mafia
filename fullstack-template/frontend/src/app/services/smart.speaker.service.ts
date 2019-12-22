import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { NameService } from './name.service';
import { SmartSpeakerService } from '../smart-speaker.service';
import { RequestService } from './request.service';
import { SmarttvComponent } from '../smarttv/smarttv.component';
import { SocketsService } from '../global/services';

@Injectable({
  providedIn: 'root'
})

/**
 * Request service is responsible for making 
 * requests easier to be make with a simple function and 
 * observables
 * 
 * This service will have predefined functions for common requests
 */
export class MafiaSmartSpeakerService {

  constructor(
                public http: HttpClient,
                private smartSpeaker : SmartSpeakerService,
                private requestService : RequestService,
                private socketService : SocketsService
              ) {
               }



    public initRandomQuestions(){
        
        this.smartSpeaker.addCommand(['Who died last round' , 
                                      'Who died in the last round' ,
                                      'Last round dead person',
                                      'Last round loss'] , () => {

            this.requestService.getLastDead().then((data :any) => {
                    this.smartSpeaker.speak(`In the last round ${data.char.name} died!`)
            })
        })


        this.smartSpeaker.addCommand(['Tell me the round' , "Which round are we playing"] , () => {
            this.requestService.getRound().then((round : any) => {
                this.smartSpeaker.speak(`We are in the round number ${round - 1}`)
            })
        })


        
        this.smartSpeaker.addCommand(['We are ready to play' , "We're ready to play" , 'Lets play' , 'Start game'] , () => {
            this.readyPlayersScript();
        })

        this.smartSpeaker.addCommand(['stop speaker'] , () => {
            this.smartSpeaker.stopSpeaker();
        })

        this.smartSpeaker.addCommand(['banana'] , () => {
            this.smartSpeaker.killSpeaker();
        })

        this.smartSpeaker.addCommand(['spanish'] , () => {
            this.smartSpeaker.spanish();
        })


        this.smartSpeaker.addCommand(['German'] , () => {
            this.smartSpeaker.deutch();
            // SmarttvComponent.qrcode = true;
        })


        this.smartSpeaker.addCommand(['English'] , () => {
            this.smartSpeaker.english();
            // SmarttvComponent.qrcode = true;
        })
        
        this.smartSpeaker.addCommand(['I want to play Mafia'] , () => {
            this.initScript();
            // SmarttvComponent.qrcode = true;
        })
        

    
        // this.smartSpeaker.addCommand('Start Mafia' , () => {
        //   this.qrcode=!this.qrcode;
        //   this.smartSpeaker.speak("Please scan the QR code to enter the game!" , () => {});
        // })
    
        // this.smartSpeaker.addCommand("Okay let's play" , () => {
        //   this.qrcode=!this.qrcode;
        //   this.smartSpeaker.speak("Thank you, Have fun" , () => {});
        // })

    }

    
        /**
         * 
         * 
         * 1.Welcome
         * 2.readyPlayersScript
         * 
         * 
         */
    public initScript(){

        // this.smartSpeaker.addCommand(['Phase 1' , 'Start Game'], () => {
          this.smartSpeaker.speak("Welcome to Mafia, my name is Jessica and I will be your host for today", () => { });
          this.smartSpeaker.speak("Say Jessica help, for a list of commands that I can assist you with", () => { });
          this.smartSpeaker.speak("But first, scan the QR-code and then choose your name and avatar in your mobile device", () => { });

        // })

        //this.helpScript();

    }


    public helpScript(){
        this.smartSpeaker.addCommand(['yelp', 'help', 'shelf'], () => {
            this.smartSpeaker.speak("Help instructions follow", () => { });
            this.smartSpeaker.speak("Say Jessica tell me the round, to find out the round that you are on", () => { });
            this.smartSpeaker.speak("Say Jessica who died last round, to find out the last person that died", () => { });
            this.smartSpeaker.speak("There are many more commands", () => { });
            this.smartSpeaker.speak("Ask my creators to tell you which have been implemented", () => { });
          })
    }


    public readyPlayersScript(){
        // this.smartSpeaker.addCommand(['Phase 2' , 'We are ready' , 'Start game' , 'Lets play' , 'Start'], () => {
            this.smartSpeaker.speak("The game is ready to start", () => {
                this.requestService.startGame().then((data) => console.log(data)).catch((err) => console.error(err));
             });
            this.smartSpeaker.speak("A role has been assigned to you", () => { });
            this.smartSpeaker.speak("You can see that role by pressing the button in the top right corner of your phone", () => { 
                setTimeout(() => { this.gameStartScript() } , 5000);
            });
        //   })      


    }


    public gameStartScript(){
        this.nightScript();
    }


    public nightScript(){
        // this.smartSpeaker.addCommand(['Phase 3'], () => {
            this.smartSpeaker.speak("The game is about to begin", () => { });
            this.smartSpeaker.speak("Please, everyone close your eyes", () => { });
            setTimeout(()=>{this.smartSpeaker.speak("Masons open your eyes so that you know each other", () => { });}, 6000);
            setTimeout(()=>{this.smartSpeaker.speak("Masons close your eyes", () => { });}, 15000);
            setTimeout(()=>{this.smartSpeaker.speak("Mafiosi open your eyes so that you know each other", () => { });}, 20000);
            setTimeout(()=>{this.smartSpeaker.speak("Mafiosi close your eyes", () => { });}, 30000);
            setTimeout(()=>{this.smartSpeaker.speak("All Mafiosi except the Godfather raise your hand", () => { });}, 35000);
            setTimeout(()=>{this.smartSpeaker.speak("Detective open your eyes and see the mafia goons", () => { });}, 40000);
            setTimeout(()=>{this.smartSpeaker.speak("Detective close your eyes", () => { });}, 50000);
            setTimeout(()=>{this.smartSpeaker.speak("A new day begins", () => {
                this.requestService.nextRound();
             });}, 55000);
        //   })
    }


    public endofroundScript(){
        // this.smartSpeaker.addCommand(['Phase 4'], () => {
        this.smartSpeaker.speak("The votes have been casted and the first person is dead", () => {
            this.requestService.die().then((data) => console.log(data)).catch((err) => console.error(err));
         });

        setTimeout(() => { 
        this.smartSpeaker.speak("It's time for the Mafiosi to try to claim a victim", () => { });
        this.smartSpeaker.speak("Please, everyone close your eyes", () => { });
            setTimeout(()=>{this.smartSpeaker.speak("Mafiosi open your eyes and decide who do you want to kill", () => { 
                this.requestService.showKillingScreen().then(() => {
                    this.socketService.syncMessages("proceed").subscribe(() => {
                        setTimeout(()=>{this.smartSpeaker.speak("The Mafia striked", () => { });}, 1000);  //this will be in a different event
                        setTimeout(()=>{this.smartSpeaker.speak("Mafiosi close your eyes", () => { });}, 3000);
                        setTimeout(()=>{this.smartSpeaker.speak("Doctor if you want to use your ability to save someone, you can do so now", () => {
                            this.requestService.openDoctorPhone().then(() => {
                                this.socketService.syncMessages("doctor_voted").subscribe(() => {
                                    setTimeout(()=>{this.smartSpeaker.speak("The doctor has decided", () => { });}, 1000);
                                    setTimeout(()=>{this.smartSpeaker.speak("Everyone close your eyes", () => { });}, 3000);
                                    setTimeout(()=>{this.smartSpeaker.speak("A new day begins in 5 seconds", () => {
                                        this.requestService.die().then((data) => {
                                            console.log(data)
                                            setTimeout(() => this.requestService.nextRound() , 5000);
                                        }).catch((err) => console.log(err));
                                     });}, 5000);
                                })
                            })
                         });}, 5000);
                    })
                })
            });}, 5000);
        // })
        } , 2000);
    }
}
