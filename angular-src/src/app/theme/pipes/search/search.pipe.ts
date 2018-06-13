import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'SearchPipe' })
export class SearchPipe implements PipeTransform {
  transform(value, args?): Array<any> {
    let searchText = new RegExp(args, 'i');
    if (value) {
      return value.filter(person => {
        if (person.Name) {
          return person.Name.search(searchText) !== -1;
        }
      });
      }
  }
}
