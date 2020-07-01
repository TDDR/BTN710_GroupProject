import { Component, OnInit } from '@angular/core';
import { DataManagerService } from '../observables/data-manager.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Word, Definition } from '../observables/data-classes';

@Component({
  selector: 'app-remove-word',
  templateUrl: './remove-word.component.html',
  styleUrls: ['./remove-word.component.css']
})
export class RemoveWordComponent implements OnInit {

  constructor(private manager: DataManagerService, 
    private route: ActivatedRoute,
    private router: Router ) { }
    
    word: Word;
    definitions: Definition[]
    term: string;
  
    ngOnInit(): void {
      
      this.term = this.route.snapshot.paramMap.get('word');
      
      this.manager.getWord(this.term).subscribe(response => this.word = response);
  
      this.manager.getDefinitions().subscribe(response => this.definitions = response);
  }

  remove(): void{

      this.manager.removeWord(this.word.wordEnglish).subscribe();

      this.router.navigate(["/get-all-words"]);
  }
}
