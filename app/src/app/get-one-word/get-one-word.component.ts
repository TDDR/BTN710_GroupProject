import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {DataManagerService} from '../observables/data-manager.service';
import {Word, Definition, OtherWords} from '../observables/data-classes';

@Component({
  selector: 'app-get-one-word',
  templateUrl: './get-one-word.component.html',
  styleUrls: ['./get-one-word.component.css']
})
export class GetOneWordComponent implements OnInit {

  constructor(private manager: DataManagerService, 
              private route: ActivatedRoute) { }
  
  word: Word;
  otherWords: OtherWords[];
  definitions: Definition[]
  term: string;

  ngOnInit(): void {
    
    this.term = this.route.snapshot.paramMap.get('word');
    
    this.manager.getWord(this.term).subscribe(response => this.word = response);

    this.manager.getDefinitions().subscribe(response => this.definitions = response);

    this.manager.getOtherWords().subscribe(response => this.otherWords = response);
    }

    likeDef(def: Definition): void{
      def.likes++;
      this.manager.addLike(def).subscribe();
    }

    addY(word){
      word.helpYes++;
      this.manager.helpYes(word).subscribe();
    }
  
    addN(word){
      word.helpNo++;
      this.manager.helpNo(word).subscribe();
    }
  
  }

