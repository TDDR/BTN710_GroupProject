import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Definition } from 'src/app/observables/data-classes';

@Component({
  selector: 'app-add-like',
  templateUrl: './add-like.component.html',
  styleUrls: ['./add-like.component.css']
})
export class AddLikeComponent implements OnInit {
  @Input() definition;
  @Output() addDef: EventEmitter<Definition> = new EventEmitter<Definition>();

  constructor() { }

  ngOnInit(): void {
  }

  addD(def): void{
      
    this.addDef.emit(def);

   }

}
