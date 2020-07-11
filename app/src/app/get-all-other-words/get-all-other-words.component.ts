import { Component, OnInit } from '@angular/core';
import { OtherWord } from '../observables/data-classes';
import { DataManagerService } from '../observables/data-manager.service';
import { HttpErrorResponse } from '@angular/common/http';
import {Router} from '@angular/router';

@Component({
  selector: 'app-get-all-other-words',
  templateUrl: './get-all-other-words.component.html',
  styleUrls: ['./get-all-other-words.component.css']
})
export class GetAllOtherWordsComponent implements OnInit {

  
  constructor(private manager: DataManagerService,
              private router: Router) { }

  words: OtherWord[];
  public searchFor;

  ngOnInit(): void {
    
    this.manager.getOtherWords()
      .subscribe(
        response => this.words = response,
        err => {
          if(err instanceof HttpErrorResponse){
            
              this.router.navigate(['/login'])
            
          }
        });
  
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
