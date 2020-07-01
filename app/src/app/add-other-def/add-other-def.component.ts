import { Component, OnInit } from '@angular/core';
import { DataManagerService } from '../observables/data-manager.service';
import { ActivatedRoute, Router } from '@angular/router';
import { OtherWords, OtherWordToAdd } from '../observables/data-classes';

@Component({
  selector: 'app-add-other-def',
  templateUrl: './add-other-def.component.html',
  styleUrls: ['./add-other-def.component.css']
})
export class AddOtherDefComponent implements OnInit {

  constructor(private manager: DataManagerService, 
    private route: ActivatedRoute,
    private router: Router ) { }

word: OtherWords;
addDef = new OtherWordToAdd("", "","","","","","","","","","","",new Date(),new Date(),"",0,0,"","")
newWord: OtherWords;
term: string;

ngOnInit(): void {

this.term = this.route.snapshot.paramMap.get('word');

this.manager.getOtherWord(this.term).subscribe(response => this.word = response);

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
  this.addDef.termEnglishId = this.word.termEnglishId;

  // Send request
  this.manager.addOtherDef(this.addDef).subscribe(data => this.newWord = data);

  this.router.navigate(["/get-all-other-words"]);
}


}
