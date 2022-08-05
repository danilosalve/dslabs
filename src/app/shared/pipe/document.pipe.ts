import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'document'
})
export class DocumentPipe implements PipeTransform {
  transform(document: string): string {
    document = document.replace(/\D/g, '');

    switch (document.length) {
      case 11:
        return document.replace(/(\d+)(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4');
      case 14:
        return document.replace(
          /(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})/g,
          '$1.$2.$3/$4-$5'
        );
      default:
        return document;
    }
  }

}
