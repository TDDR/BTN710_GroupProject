import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Word } from 'src/app/observables/data-classes';


@Component({
  selector: 'app-help-no',
  templateUrl: './help-no.component.html',
  styleUrls: ['./help-no.component.css']
})
export class HelpNoComponent implements OnInit {
    @Input() wordFromParent;
    @Output() helpNoo: EventEmitter<Word> = new EventEmitter<Word>();
  
    constructor() { }

    ngOnInit(): void {
    }

    helpN(word: Word): void{
      
     this.helpNoo.emit(word);
  
   }

}
