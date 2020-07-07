import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs";
// Import data model classes, for example...
import { Word, Definition, WordToAdd, OtherWord, OtherWordToAdd, addUser, User } from "./data-classes";

@Injectable({
  providedIn: 'root'
})
export class DataManagerService {

  // Inject the HttpClient
  constructor(private http: HttpClient) { }

  // Base URL for the web API
  //private url: string = 'https://young-scrubland-01140.herokuapp.com';
  private url: string = 'https://localhost:8080';

  // Options object for POST and PUT requests
  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };


  //******************* Authenticate/Authorize methods *********************
  addUser(user: addUser){
    return this.http.post<User>(`${this.url}/register`, user, this.httpOptions)
  }

  //******************* Callable Word methods *********************

  getWords(): Observable<Word[]> {
    return this.http.get<Word[]>(`${this.url}/words`)
  }

  getWord(word: string): Observable<Word>{
    return this.http.get<Word>(`${this.url}/words/get/${word}`) 
  }
    
  addWord(word: WordToAdd){
    return this.http.post<Word>(`${this.url}/words`, word, this.httpOptions)
  }

  //Add definition
  addDef(word: WordToAdd){
    return this.http.put<Word>(`${this.url}/words/addDef/${word.wordEnglish}`, word, this.httpOptions)
  }

  //Increment HelpYes
  helpYes(word: Word){
    return this.http.put<Word>(`${this.url}/words/helpYes/${word.wordEnglish}`, word, this.httpOptions)
  }
  //Increment HelpNo
  helpNo(word: Word){
    return this.http.put<Word>(`${this.url}/words/helpNo/${word.wordEnglish}`, word, this.httpOptions)
  }
 
  removeWord(word: string){
    return this.http.delete(`${this.url}/words/${word}`)
  }

//******************* Callable Definition methods *********************

  getDefinitions(): Observable<Definition[]> {
    return this.http.get<Definition[]>(`${this.url}/definitions`)
  }

  getDefinition(id: string): Observable<Definition>{
    return this.http.get<Definition>(`${this.url}/definitions/${id}`) 
  }

   //Add like to definition
   addLike(def: Definition){
    return this.http.put<Definition>(`${this.url}/definitions/like/${def._id}`, def, this.httpOptions)
  }

  //******************* Callable Other Word methods *********************

  getOtherWords(): Observable<OtherWord[]> {
    return this.http.get<OtherWord[]>(`${this.url}/otherWords`)
  }

  getOtherWord(word: string): Observable<OtherWord>{
    return this.http.get<OtherWord>(`${this.url}/otherWords/get/${word}`) 
  }
    
  addOtherWord(word: OtherWordToAdd){
    return this.http.post<OtherWord>(`${this.url}/otherWords`, word, this.httpOptions)
  }

  //Add definition
  addOtherDef(word: OtherWordToAdd){
    return this.http.put<OtherWord>(`${this.url}/otherWords/addDef/${word.wordNonEnglish}`, word, this.httpOptions)
  }

  //Increment HelpYes
  otherHelpYes(word: OtherWord){
    return this.http.put<OtherWord>(`${this.url}/otherWords/helpYes/${word.wordNonEnglish}`, word, this.httpOptions)
  }
  //Increment HelpNo
  otherHelpNo(word: OtherWord){
    return this.http.put<OtherWord>(`${this.url}/otherWords/helpNo/${word.wordNonEnglish}`, word, this.httpOptions)
  }
 
  removeOtherWord(word: string){
    return this.http.delete(`${this.url}/otherWords/${word}`)
  }

}
