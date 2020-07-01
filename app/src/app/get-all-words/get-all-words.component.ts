import { Component, OnInit } from '@angular/core';
import {DataManagerService} from '../observables/data-manager.service';
import {Word} from '../observables/data-classes';

@Component({
  selector: 'app-get-all-words',
  templateUrl: './get-all-words.component.html',
  styleUrls: ['./get-all-words.component.css']
})
export class GetAllWordsComponent implements OnInit {

  constructor(private manager: DataManagerService) { }

  public words: Word[];
  public found: Word[];
  public searchFor;

  ngOnInit(): void {
    
    this.manager.getWords().subscribe(response => this.words = response);
  }
}