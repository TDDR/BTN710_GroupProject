import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit {

  // Create a "Student" object
  s: Student = { name: "Tim Roberts", id: "104 531 181", 
                streetAddress: "212-100 Wingarden Court", city: "Toronto, ON", 
                postal:"M1B 2P4", phone: "289-400-7667", email: "troberts10@myseneca.ca"};

  constructor() { }

  ngOnInit() { }

}

class Student {
  name: string;
  id: string;
  streetAddress: string;
  city: string;
  postal: string;
  phone: string;
  email: string;
}
