import { Component, OnInit } from '@angular/core';
import { DataManagerService } from '../observables/data-manager.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Word, WordToAdd } from '../observables/data-classes';

@Component({
  selector: 'app-add-def',
  templateUrl: './add-def.component.html',
  styleUrls: ['./add-def.component.css']
})
export class AddDefComponent implements OnInit {

  constructor(private manager: DataManagerService, 
    private route: ActivatedRoute,
    private router: Router ) { }

word: Word;
addDef = new WordToAdd("", "","","","","","","","","","","",new Date(),new Date(),"",0,0,"",)
newWord: Word;
term: string;

ngOnInit(): void {

this.term = this.route.snapshot.paramMap.get('word');

this.manager.getWord(this.term).subscribe(response => this.word = response);

}

// Form submit button handler
defSave(): void {

  //Prepare object for updating
  this.addDef.wordEnglish = this.word.wordEnglish,
  this.addDef.wordNonEnglish = this.word.wordNonEnglish,
  this.addDef.wordExpanded = this.word.wordExpanded,
  this.addDef.languageCode = this.word.languageCode,
  this.addDef.image = this.word.image,
  this.addDef.imageType = this.word.imageType,
  this.addDef.audio = this.word.audio,
  this.addDef.audioType = this.word.audioType,
  this.addDef.linkAuthoritative = this.word.linkAuthoritative,
  this.addDef.linkWikipedia = this.word.linkWikipedia,
  this.addDef.linkYouTube = this.word.linkYouTube,
  this.addDef.dateCreated = this.word.dateCreated,
  this.addDef.fieldOfStudy = this.word.fieldOfStudy,
  this.addDef.helpYes = this.word.helpYes,
  this.addDef.helpNo = this.word.helpNo;

  // Send request
  this.manager.addDef(this.addDef).subscribe(data => this.newWord = data);

  this.router.navigate(["/get-all-words"]);
}


}
