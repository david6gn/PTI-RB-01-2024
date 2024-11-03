import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'capitalizeLastChar',
  standalone: true
})
export class CapitalizeLastCharPipe implements PipeTransform {
  transform(value: string): string {
    if (!value || value.length === 0) return value;
    if (value.length === 1) return value.toUpperCase(); 
    const lastChar = value.charAt(value.length - 1).toUpperCase(); 
    return value.slice(0, -1) + lastChar; 
  }
}
