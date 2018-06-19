import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'ngxSlug'
})
export class SlugPipe implements PipeTransform {
  transform(value: any, spaceReplaceChar = '-'): any {
    return value.toLowerCase().trim()
    .replace(/&/g, '-and-')                  // Replaces & with 'and'
    .replace(/[\s\W-]+/g, spaceReplaceChar)  // Spaces, non-word characters and dashes
    .replace(/-$/, '');                      // Remove last floating dash if exists
  }
}
