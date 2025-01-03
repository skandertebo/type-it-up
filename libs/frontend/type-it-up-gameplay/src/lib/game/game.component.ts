import { CommonModule } from '@angular/common';
import { Component, HostListener, Input } from '@angular/core';
import { CharState,  Word, Cursor } from './types';

@Component({
  selector: 'lib-game',
  standalone: true,
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.css'],
  imports: [CommonModule],
})
export class GameComponent {
  @Input() text =
    'why row wheel my nation miss remember position spring lie hot usual dress sister save next village gather line sand trip then their port work stop please spell out broke program song children question cause against five seat';

  words: Word[] = [];
  cursor: Cursor = { wordIndex: 0, charIndex: 0 };

  constructor() {
    this.initializeWords();
  }

  initializeWords() {
    this.words = this.text.split(' ').map((word) =>
      word.split('').map((char) => ({
        char,
        state: CharState.Deactivated,
      }))
    );
  }

  @HostListener('document:keydown', ['$event'])
  handleKeyPress(event: KeyboardEvent) {
    const key = event.key;

    if (/^[a-zA-Z0-9,.!?]$/.test(key)) {
      this.handleAlphanumeric(key);
    } else if (key === ' ') {
      this.handleSpacebar();
    } else if (key === 'Backspace') {
      this.handleBackspace();
    }
  }

  handleAlphanumeric(key: string) {
    const { wordIndex, charIndex } = this.cursor;
    if (wordIndex < this.words.length && charIndex < this.words[wordIndex].length) {
      const currentChar = this.words[wordIndex][charIndex];
      currentChar.state = currentChar.char === key ? CharState.Right : CharState.Wrong;
      this.cursor.charIndex++;
    }
  }

  handleSpacebar() {
    let index  = this.cursor.charIndex;
    const wordIndex = this.cursor.wordIndex

    // Mark remaining characters in the word as 'wrong'
    while (index < this.words[wordIndex].length) {
      this.words[wordIndex][index].state = CharState.Wrong;
      index++;
    }

    // Move to the next word
    if (wordIndex < this.words.length - 1) {
      this.cursor.wordIndex++;
      this.cursor.charIndex = 0;
    } else if(wordIndex == this.words.length - 1){
      this.cursor.charIndex = this.words[wordIndex].length 
    }
  }

  handleBackspace() {
    const { wordIndex, charIndex } = this.cursor;

    if (charIndex > 0) {
      // Deactivate the last character in the current word
      this.cursor.charIndex--;
      this.words[wordIndex][this.cursor.charIndex].state = CharState.Deactivated;
    } else if (wordIndex > 0) {
      // Move back to the last word
      this.cursor.wordIndex--;
      this.cursor.charIndex = this.words[wordIndex - 1].length;
    }
     
  } 
}