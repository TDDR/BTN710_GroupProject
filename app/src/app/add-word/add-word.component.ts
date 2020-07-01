import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { DataManagerService } from '../observables/data-manager.service';
import { Word, WordToAdd } from '../observables/data-classes';

@Component({
  selector: 'app-add-word',
  templateUrl: './add-word.component.html',
  styleUrls: ['./add-word.component.css']
})
export class AddWordComponent implements OnInit {

  constructor(private manager: DataManagerService,
              private router: Router) { }

  word =  new WordToAdd("","","","en","","","","","","","","", new Date(), new Date(), "", 0, 0, "",);
  newWord = new Word();  

  ngOnInit(): void {
  }

      // Form submit button handler
      wordSave(): void {

        // Send request
        this.manager.addWord(this.word).subscribe(data => this.newWord = data);
    
        this.router.navigate(["/get-all-words"]);
      }

}
