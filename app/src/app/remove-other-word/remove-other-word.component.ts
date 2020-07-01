import { Component, OnInit } from '@angular/core';
import { DataManagerService } from '../observables/data-manager.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Definition, OtherWord } from '../observables/data-classes';

@Component({
  selector: 'app-remove-other-word',
  templateUrl: './remove-other-word.component.html',
  styleUrls: ['./remove-other-word.component.css']
})
export class RemoveOtherWordComponent implements OnInit {

  constructor(private manager: DataManagerService, 
    private route: ActivatedRoute,
    private router: Router ) { }
    
    word: OtherWord;
    definitions: Definition[]
    term: string;
  
    ngOnInit(): void {
      
      this.term = this.route.snapshot.paramMap.get('word');
      
      this.manager.getOtherWord(this.term).subscribe(response => this.word = response);
  
      this.manager.getDefinitions().subscribe(response => this.definitions = response);
  }

  remove(): void{

      this.manager.removeOtherWord(this.word.wordEnglish).subscribe();

      this.router.navigate(["/get-all-words"]);
  }
}
