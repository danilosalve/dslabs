import {
  AbstractControl,
  AsyncValidatorFn,
  ValidationErrors
} from '@angular/forms';
import { PoNotificationService } from '@po-ui/ng-components';
import { BehaviorSubject, Observable } from 'rxjs';
import {
  debounceTime,
  distinctUntilChanged,
  filter,
  map,
  switchMap,
  take
} from 'rxjs/operators';
import { CustomerService } from './../../../shared/services/customer.service';

export class DocumentExistValidator {
    static customerDocumentExist( customerService: CustomerService, poNotificationService: PoNotificationService ): AsyncValidatorFn {
        const subject = new BehaviorSubject<string>('');
        const output = subject.asObservable().pipe(
            debounceTime(300),
            filter(document => document.length == 11 || document.length == 14),
            distinctUntilChanged(),
            take(1),
            switchMap((document: string) =>
                customerService
                    .getByDocument(document)
                    .pipe(map(apiResponse => apiResponse))
            ),
            map(response => {
                if (response.length > 0) {
                    poNotificationService.error( 'Atenção CNPJ/CPF já cadastrado !' );
                }
                return response.length > 0
                    ? ({ invalidAsync: true } as ValidationErrors)
                    : null;
            })
        );

        return ( control: AbstractControl ): Observable<ValidationErrors | null> => {
            const document = control.value;
            subject.next(document);
            return output;
        };
    }
}
