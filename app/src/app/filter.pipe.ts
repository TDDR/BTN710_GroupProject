import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {

  transform(found: any[], searchFor: string): any[] {

    if(!found){
      return [];
    }
    if(!searchFor){
      return found;
    }
    searchFor = searchFor.toLocaleLowerCase();

    return found.filter(f =>{
      return f.wordEnglish.toLocaleLowerCase().includes(searchFor);
    })
  }

}
