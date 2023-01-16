import { Component, Input } from '@angular/core';
import { UtilsService } from '@app/shared/services/utils.service';
import { Contact } from '../../shared/interfaces/contact';
import { DocumentPipe } from './../../../../shared/pipe/document.pipe';

@Component({
  selector: 'app-registration-data',
  templateUrl: './registration-data.component.html'
})
export class RegistrationDataComponent {
  @Input() contact!: Contact;
  constructor(protected utilsService: UtilsService, protected documentPipe: DocumentPipe) {}
}
