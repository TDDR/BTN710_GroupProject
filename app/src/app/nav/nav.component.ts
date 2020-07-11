import { Component, OnInit } from '@angular/core';
import { DataManagerService } from '../observables/data-manager.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {

  constructor(public manager: DataManagerService) { }

  ngOnInit() {
  }

}
