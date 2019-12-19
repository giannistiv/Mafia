import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { NameService } from './name.service';
import { SmartSpeakerService } from '../smart-speaker.service';
import { RequestService } from './request.service';

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
                private nameService: NameService,
                private smartSpeaker : SmartSpeakerService,
                private requestService : RequestService
              ) { }



    public initRandomQuestions(){

        debugger;
        this.smartSpeaker.addCommand(['Who died last round' , 
                                      'Who died in the last round' ,
                                      'Last round dead person',
                                      'Last round loss'] , () => {

            this.requestService.getLastDead().then((data :any) => {
                    this.smartSpeaker.speak(`In the last round ${data.char.name} died with ${data.votes} votes`)
            })
        })


        this.smartSpeaker.addCommand(['Tell me the round' , "Which round are we playing"] , () => {
            this.requestService.getRound().then((round : any) => {
                this.smartSpeaker.speak(`We are in the ${round}th round`)
            })
        })


        this.smartSpeaker.addCommand(['We are ready to play' , 'Lets play' , 'Start game'] , () => {
            this.readyPlayersScript();
        })


        this.smartSpeaker.addCommand(['I want to play Mafia'] , () => {
            this.initScript();
        })

    }

    public initScript(){

        // this.smartSpeaker.addCommand(['Phase 1' , 'Start Game'], () => {
          this.smartSpeaker.speak("Welcome to Mafia, my name is Alfred and I will be your host for today", () => { });
          this.smartSpeaker.speak("Say Alfred help, for a list of commands that I can assist you with", () => { });
          this.smartSpeaker.speak("But first, choose your name and avatar in your mobile device", () => { });

        // })

        this.helpScript();

    }


    public helpScript(){
        this.smartSpeaker.addCommand(['yelp', 'help', 'shelf'], () => {
            this.smartSpeaker.speak("Help instructions follow", () => { });  //have to add some help commands, like how many are alive, and who died in the last round
          })
    }


    public readyPlayersScript(){
        // this.smartSpeaker.addCommand(['Phase 2' , 'We are ready' , 'Start game' , 'Lets play' , 'Start'], () => {
            this.smartSpeaker.speak("The game is ready to start", () => {
                this.requestService.startGame().then((data) => console.log(data)).catch((err) => console.error(err));
             });
            this.smartSpeaker.speak("A role has been assigned to you", () => { });
            this.smartSpeaker.speak("You can see that role by pressing the button in the top left corner of your phone", () => { });
        //   })      

             //this.gameStartsSrcipt()
    }


    public gameStartScript(){
        this.nightScript();
    }


    public nightScript(){
        // this.smartSpeaker.addCommand(['Phase 3'], () => {
            this.smartSpeaker.speak("The game is about to begin", () => { });
            this.smartSpeaker.speak("Please, everyone close your eyes", () => { });
            setTimeout(()=>{this.smartSpeaker.speak("Masons open your eyes so that you know each other", () => { });}, 10000);
            setTimeout(()=>{this.smartSpeaker.speak("Masons close your eyes", () => { });}, 25000);
            setTimeout(()=>{this.smartSpeaker.speak("Mafiosi open your eyes so that you know each other", () => { });}, 35000);
            setTimeout(()=>{this.smartSpeaker.speak("Mafiosi close your eyes", () => { });}, 55000);
            setTimeout(()=>{this.smartSpeaker.speak("All Mafiosi except the Godfather raise your hand", () => { });}, 60000);
            setTimeout(()=>{this.smartSpeaker.speak("Merlin open your eyes and see the mafia goons", () => { });}, 68000);
            setTimeout(()=>{this.smartSpeaker.speak("Merlin close your eyes", () => { });}, 78000);
            setTimeout(()=>{this.smartSpeaker.speak("A new day begins", () => { });}, 85000);
        //   })
    }


    public endofroundScript(){
        // this.smartSpeaker.addCommand(['Phase 4'], () => {
        this.smartSpeaker.speak("The votes have been casted and the first person is dead", () => {
            this.requestService.die().then((data) => console.log(data)).catch((err) => console.error(err));
         });
        this.smartSpeaker.speak("It's time for the Mafiosi to try to claim a victim", () => { });
        this.smartSpeaker.speak("Please, everyone close your eyes", () => { });
            // setTimeout(()=>{this.smartSpeaker.speak("Mafiosi open your eyes and decide who do you want to kill", () => { });}, 10000);
            // setTimeout(()=>{this.smartSpeaker.speak("The Mafia striked", () => { });}, 24000);  //this will be in a different event
            // setTimeout(()=>{this.smartSpeaker.speak("Mafiosi close your eyes", () => { });}, 25000);
            // setTimeout(()=>{this.smartSpeaker.speak("Doctor if you want to use your ability to save someone, you can do so now", () => { });}, 30000);
            // setTimeout(()=>{this.smartSpeaker.speak("The doctor has decided", () => { });}, 48000);
            // setTimeout(()=>{this.smartSpeaker.speak("Everyone close your eyes", () => { });}, 49000);
            setTimeout(()=>{this.smartSpeaker.speak("A new day begins", () => {
                this.requestService.die().then((data) => {
                    console.log(data)
                    setTimeout(() => this.requestService.nextRound() , 5000);
                }).catch((err) => console.log(err));
             });}, 2000);
        // })
    }
}
