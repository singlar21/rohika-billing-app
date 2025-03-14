import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'tableSearch',
  standalone: true
})
export class TableSearchPipe implements PipeTransform {

  transform(items: any[], searchText: string): any[] {
    if (!items) return [];
    if (!searchText) return items;

    searchText = searchText.toLowerCase();

    return items.filter(item => 
      Object.values(item).some(value => 
        value && value.toString().toLowerCase().includes(searchText)
      )
    );
  }

}
