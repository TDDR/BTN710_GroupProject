import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from "@angular/common/http";
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import {FormsModule} from '@angular/forms'

import { AppComponent } from './app/app.component';
import { NavComponent } from './nav/nav.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { HomeComponent } from './home/home.component';
import { AboutComponent } from './about/about.component';
import { ContactComponent } from './contact/contact.component';

import { GetAllWordsComponent } from './get-all-words/get-all-words.component';
import { GetOneWordComponent } from './get-one-word/get-one-word.component';
import { AddWordComponent } from './add-word/add-word.component';
import { AddDefComponent } from './add-def/add-def.component';
import { RemoveWordComponent } from './remove-word/remove-word.component';

import { GetAllOtherWordsComponent } from './get-all-other-words/get-all-other-words.component';
import { GetOneOtherWordComponent } from './get-one-other-word/get-one-other-word.component';
import { AddOtherWordComponent } from './add-other-word/add-other-word.component';
import { AddOtherDefComponent } from './add-other-def/add-other-def.component';
import { RemoveOtherWordComponent } from './remove-other-word/remove-other-word.component';

import { HelpNoComponent } from './get-all-words/help-no/help-no.component';
import {HelpYesComponent} from './get-all-words/help-yes/help-yes.component';
import { AddLikeComponent } from './get-one-word/add-like/add-like.component';
import { FilterPipe } from './filter.pipe';

@NgModule({
  declarations: [
    AppComponent,
    NavComponent,
    NotFoundComponent,
    HomeComponent,
    AboutComponent,
    ContactComponent,
    GetAllWordsComponent,
    GetOneWordComponent,
    AddWordComponent,
    RemoveWordComponent,
    AddDefComponent,
    AddOtherWordComponent,
    GetAllOtherWordsComponent,
    GetOneOtherWordComponent,
    RemoveOtherWordComponent,
    AddOtherDefComponent,
    HelpNoComponent,
    HelpYesComponent,
    AddLikeComponent,
    FilterPipe,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
