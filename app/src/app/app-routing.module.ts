import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from "./home/home.component";
import { AboutComponent } from './about/about.component';
import { ContactComponent } from "./contact/contact.component";
import { NotFoundComponent } from "./not-found/not-found.component";

import {GetAllWordsComponent} from "./get-all-words/get-all-words.component";
import {GetOneWordComponent} from "./get-one-word/get-one-word.component";
import {AddWordComponent} from "./add-word/add-word.component"
import {AddDefComponent} from "./add-def/add-def.component";
import {RemoveWordComponent} from "./remove-word/remove-word.component";

import { GetAllOtherWordsComponent } from './get-all-other-words/get-all-other-words.component';
import { GetOneOtherWordComponent } from './get-one-other-word/get-one-other-word.component';
import { AddOtherWordComponent } from './add-other-word/add-other-word.component';
import { AddOtherDefComponent } from './add-other-def/add-other-def.component';
import { RemoveOtherWordComponent } from './remove-other-word/remove-other-word.component';


const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'about', component: AboutComponent },
  { path: 'contact', component: ContactComponent },

  { path: 'get-all-words', component: GetAllWordsComponent },
  { path: 'get-one-word/:word', component: GetOneWordComponent },
  { path: 'add-word', component: AddWordComponent },
  { path: 'add-def/:word', component: AddDefComponent },
  { path: 'remove-word/:word', component: RemoveWordComponent },

  { path: 'get-all-other-words', component: GetAllOtherWordsComponent },
  { path: 'get-one-other-word/:word', component: GetOneOtherWordComponent },
  { path: 'add-other-word', component: AddOtherWordComponent },
  { path: 'add-other-word/:word', component: AddOtherWordComponent },
  { path: 'add-other-def/:word', component: AddOtherDefComponent },
  { path: 'remove-other-word/:word', component: RemoveOtherWordComponent },

  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: '**', component: NotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {onSameUrlNavigation: 'reload'})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
