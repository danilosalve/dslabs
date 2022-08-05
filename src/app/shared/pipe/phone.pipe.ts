import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'phone'
})
export class PhonePipe implements PipeTransform {
  transform(value: number | string): string {
    let phone = value + '';

    if (phone === '****') {
      return phone;
    }

    phone = phone.replace(/\D/g, '');
    switch (phone.length) {
      case 8:
        return phone.replace(/^(\d{4})(\d{4})/, '$1-$2');
      case 9:
        return phone.replace(/^(\d{5})(\d{4})/, '$1-$2');
      case 10:
        return phone.replace(/^(\d{2})(\d{4})(\d{4})/, '($1) $2-$3');
      case 11:
        return phone.replace(/^(\d{3})(\d{4})(\d{4})/, '($1) $2-$3');
      case 12:
        return phone.replace(/^(\d{3})(\d{5})(\d{4})/, '($1) $2-$3');
      case 13:
        return phone.replace(/^(\d{2})(\d{3})(\d{4})(\d{4})/, '+$1 ($2) $3-$4');
      case 14:
        return phone.replace(/^(\d{2})(\d{3})(\d{5})(\d{4})/, '+$1 ($2) $3-$4');
      default:
        return phone;
    }
  }
}
