import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'zipcode'
})
export class ZipcodePipe implements PipeTransform {
  transform(value: number | string): string {
    let document = value + '';
    document = document.replace(/\D/g, '');
    if (document.length === 8) {
        return document.replace(/(\d{5})(\d{3})/, '$1-$2');
    } else {
        return document;
    }
  }
}
