import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'capitalizeFirstChar',
  standalone: true
})
export class CapitalizeFirstCharPipe implements PipeTransform {
  transform(value: string): string {
    if (!value || value.length === 0) return value;
    return value.charAt(0).toUpperCase() + value.slice(1);
  }
}
