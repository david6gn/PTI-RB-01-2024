import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SharedService {

  constructor() { }

  capitalizeFirstChar(input: string): string {
    if (!input) return input;
    return input.charAt(0).toUpperCase() + input.slice(1);
  }

  capitalizeLastChar(input: string): string {
    if (!input) return input;
    const lastChar = input.charAt(input.length - 1).toUpperCase();
    return input.slice(0, -1) + lastChar; 
  }
}
