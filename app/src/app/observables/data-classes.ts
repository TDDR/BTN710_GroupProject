
// Data model classes for the app
export class Word{
  _id: string;
  wordEnglish: string;
  wordNonEnglish: string;
  wordExpanded: string;
  languageCode: string;
  image: string;
  imageType: string;
  audio: string;
  audioType: string;
  linkAuthoritative  : string;
  linkWikipedia: string;
  linkYouTube: string;
  authorName: string;
  dateCreated: Date;
  dateRevised: Date;
  fieldOfStudy: string;
  helpYes: number;
  helpNo: number; 
  definition: [Definition];
}


  export class WordToAdd{
  constructor(
  public wordEnglish: string,
  public wordNonEnglish: string,
  public wordExpanded: string,
  public languageCode: string,
  public image: string,
  public imageType: string,
  public audio: string,
  public audioType: string,
  public linkAuthoritative  : string,
  public linkWikipedia: string,
  public linkYouTube: string,
  public authorName: string,
  public dateCreated: Date,
  public dateRevised: Date,
  public fieldOfStudy: string,
  public helpYes: number,
  public helpNo: number, 
  public definition: string
  ) {}
}

export class Definition{
  _id: string;
  authorName: string;
  dateCreated: Date;
  definition: string;
  quality: number;
  likes: number;
}

export class OtherWord{
  _id: string;
  wordEnglish: string;
  wordNonEnglish: string;
  wordExpanded: string;
  languageCode: string;
  image: string;
  imageType: string;
  audio: string;
  audioType: string;
  linkAuthoritative  : string;
  linkWikipedia: string;
  linkYouTube: string;
  authorName: string;
  dateCreated: Date;
  dateRevised: Date;
  fieldOfStudy: string;
  helpYes: number;
  helpNo: number; 
  definition: [Definition];
  termEnglishId: string;
}


  export class OtherWordToAdd{
  constructor(
  public wordEnglish: string,
  public wordNonEnglish: string,
  public wordExpanded: string,
  public languageCode: string,
  public image: string,
  public imageType: string,
  public audio: string,
  public audioType: string,
  public linkAuthoritative  : string,
  public linkWikipedia: string,
  public linkYouTube: string,
  public authorName: string,
  public dateCreated: Date,
  public dateRevised: Date,
  public fieldOfStudy: string,
  public helpYes: number,
  public helpNo: number, 
  public definition: string,
  public termEnglishId: string
  ) {}
}


export class OtherWords{
  _id: string;
  wordEnglish: string;
  wordNonEnglish: string;
  wordExpanded: string;
  languageCode: string;
  image: string;
  imageType: string;
  audio: string;
  audioType: string;
  linkAuthoritative: string;
  linkWikipedia: string;
  linkYouTube: string;
  authorName: string;
  dateCreated: Date;
  dateRevised: Date;
  fieldOfStudy: string;
  helpYes: number;
  helpNo: number; 
  definition: [Definition];
  termEnglishId: string;
}

export class addUser {
  constructor(
    public userName: string,
    public password: string,
    public email: string,
    public firstName: string,
    public lastName: string,
    public role: string,
    public joinedOn: Date,
    ) {}  
}

export class User{
    userName: string;
    password: string;
    email: string;
    firstName: string;
    lastName: string;
    role: string;
    joinedOn: Date;  
}
