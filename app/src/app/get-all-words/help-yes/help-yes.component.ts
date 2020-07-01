import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Word } from 'src/app/observables/data-classes';

@Component({
  selector: 'app-help-yes',
  templateUrl: './help-yes.component.html',
  styleUrls: ['./help-yes.component.css']
})
export class HelpYesComponent implements OnInit {
  @Input() wordFromParent;
  @Output() helpYee: EventEmitter<Word> = new EventEmitter<Word>();

  constructor() { }

    ngOnInit(): void {
    }

    helpY(word: Word): void{
      
    this.helpYee.emit(word);

   }

}
