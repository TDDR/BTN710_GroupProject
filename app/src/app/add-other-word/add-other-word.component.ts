import { Component, OnInit, Input } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { DataManagerService } from '../observables/data-manager.service';
import { OtherWords, OtherWordToAdd} from '../observables/data-classes';

@Component({
  selector: 'app-add-other-word',
  templateUrl: './add-other-word.component.html',
  styleUrls: ['./add-other-word.component.css']
})
export class AddOtherWordComponent implements OnInit {

  constructor(private manager: DataManagerService,
              private route: ActivatedRoute,
              private router: Router) {}

  word =  new OtherWordToAdd("","","","","","","","","","","","", new Date(), new Date(), "", 0, 0, "", "");
  newWord = new OtherWords();  
  term: string;

  ngOnInit(): void {

    this.term = this.route.snapshot.paramMap.get('word');
  }

      // Form submit button handler
      wordSave(): void {

        if(this.term){
          this.word.wordEnglish = this.term;
        }

        // Send request
        this.manager.addOtherWord(this.word).subscribe(data => this.newWord = data);
    
        this.router.navigate(["/get-all-other-words"]);
      }

}
