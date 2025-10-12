import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'tableFilter',
  pure: false,
  standalone: true
})
export class TableFilterPipe implements PipeTransform {
  transform(users: any[], filters: any): any[] {
    if (!users) return [];
    if (!filters) return users;

    return users.filter(user => {
      return Object.keys(filters).every(key => {
        if (!filters[key]) return true;
        const value = String(user[key] || '').toLowerCase();
        const filterValue = String(filters[key]).toLowerCase();

        // For date filtering (optional)
        if (key === 'createdAt' && filters[key]) {
          const userDate = new Date(user.createdAt).toISOString().slice(0, 10);
          return userDate === filterValue;
        }

        return value.includes(filterValue);
      });
    });
  }
}
