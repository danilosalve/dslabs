import { Component, Input, OnInit } from '@angular/core';
import { ControlContainer, UntypedFormGroup } from '@angular/forms';

@Component({
  selector: 'app-person-contact-form',
  templateUrl: './person-contact-form.component.html'
})
export class PersonContactFormComponent implements OnInit {
  @Input() hasName = false;
  form!: UntypedFormGroup;
  phoneMask = '(99) 9999-99999';

  constructor(private controlContainer: ControlContainer) { }
  ngOnInit(): void {
    this.form = this.controlContainer.control as UntypedFormGroup
  }

  onChangePhone(phone: string): void {
    if (phone.length === 10) {
      this.phoneMask = '(99) 9999-99999';
    } else if (phone.length === 11){
      this.phoneMask = '(99) 99999-9999';
    }
  }
}
