import { Component, OnInit } from '@angular/core';
import { OtherWord } from '../observables/data-classes';
import { DataManagerService } from '../observables/data-manager.service';

@Component({
  selector: 'app-get-all-other-words',
  templateUrl: './get-all-other-words.component.html',
  styleUrls: ['./get-all-other-words.component.css']
})
export class GetAllOtherWordsComponent implements OnInit {

  
  constructor(private manager: DataManagerService) { }

  words: OtherWord[];
  public searchFor;

  ngOnInit(): void {
    
    this.manager.getOtherWords().subscribe(response => this.words = response);
  }

  addY(word){
    word.helpYes++;
    this.manager.otherHelpYes(word).subscribe();
  }

  addN(word){
    word.helpNo++;
    this.manager.otherHelpNo(word).subscribe();
  }
}
