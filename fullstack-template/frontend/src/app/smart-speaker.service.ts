import { Injectable } from '@angular/core';
import * as Artyom from './artyom.window.min.js';

@Injectable({
  providedIn: 'root'
})
export class SmartSpeakerService {

  //private artyom: any;
  private artyom = new Artyom();
  constructor() {
  }

  /**********************/

  private initializeArtyom() {
    this.artyom.fatality();

    setTimeout(() => {
      this.artyom.initialize({
        lang: 'en-GB',
        continuous: true,// Artyom will listen forever
        listen: true, // Start recognizing
        debug: false, // Show everything in the console
        speed: 1, // talk normally
        //name: 'Bot' //set a key phrase to say before each command
      }).then(function () {
        console.log('Smart Speaker is ready');
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
    this.artyom.initializeArtyom();
    this.artyom.say(text, {
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

  /**********************/
}
