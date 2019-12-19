/**
 * An angular service for smart speaker based on artyom.js
 * 
 * In order to use it:
 *  - install artyom.js (npm i artyom.js)
 *  - add this file in src/app
 */
import { Injectable } from '@angular/core';
import Artyom from '../../node_modules/artyom.js/build/artyom';

@Injectable({
  providedIn: 'root'
})


export class SmartSpeakerService {

  public artyom: any;

  constructor() {
    this.artyom = new Artyom();
    this.artyom.ArtyomVoicesIdentifiers["en-GB"] = ["Google UK English Female", "Google UK English Male", "en-GB", "en-GB"];
  }

  /**********************/

  private initializeArtyom() {
    this.artyom.fatality();

    setTimeout(() => {
      this.artyom.initialize({
        lang: "en-GB",
        //voiceURI: "Google UK English Female",
        continuous: true,// Artyom will listen forever
        listen: true, // Start recognizing
        debug: true, // Show everything in the console
        speed: 1, // talk normally
      }).then(() => {
        console.log('Smart Speaker is ready');
        console.log(this.artyom.getVoices());
      });
    }, 250);

  }

  /**********************/

  /**
   * Speak the given text
   * 
   * @param text 
   * @param onSpeakEnded called when the speech ends
   */
  speak(text: string, onSpeakEnded?: () => any) {
    this.artyom.say(text, {
      lang:"es-GB",
      onStart: () => {
        //in case you would like to run code when speak starts
        
      },
      onEnd: () => {
        if (onSpeakEnded)
          onSpeakEnded();
      }
    });
  }

  /**********************/

  /**
   * Set a command that you would like to be recognized 
   * 
   * @param text a phrase/word or multiple phrases/words to be recognized
   * @param onVoiceRecognition a callback that is triggered whenever the system recognizes the given text
   */
  addCommand(text: string | string[], onVoiceRecognition: () => any) {
    var command = typeof (text) === 'string' ? [text] : text;

    var newCommand = {
      indexes: command,
      action: () => {
        onVoiceRecognition();
      }
    };

    this.artyom.addCommands(newCommand);
    this.initializeArtyom();
  }

  stopSpeaker() {
      this.artyom.shutUp();
      //this.artyom.fatality();
      console.log("stopped");
  }

  killSpeaker() {
    this.artyom.fatality();
    console.log("killed");
  }

  /**********************/
}
