import { Component, OnInit } from '@angular/core';
import { DataManagerService } from '../observables/data-manager.service';
import { ActivatedRoute, Router } from '@angular/router';
import {  OtherWords , Definition} from '../observables/data-classes';

@Component({
  selector: 'app-get-one-other-word',
  templateUrl: './get-one-other-word.component.html',
  styleUrls: ['./get-one-other-word.component.css']
})
export class GetOneOtherWordComponent implements OnInit {

  constructor(private manager: DataManagerService, 
    private route: ActivatedRoute,
    private router: Router ) { }

  word: OtherWords;
  definitions: Definition[]
  term: string;

  wordNav(word: OtherWords){

    this.router.navigate(['../get-all-other-words', {wordEnglish: word.wordNonEnglish}])
  }

  ngOnInit(): void {

    this.term = this.route.snapshot.paramMap.get('word');

    this.manager.getOtherWord(this.term).subscribe(response => this.word = response);

    this.manager.getDefinitions().subscribe(response => this.definitions = response);

  }

  likeDef(def: Definition): void{
    def.likes++;
    this.manager.addLike(def).subscribe();
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
