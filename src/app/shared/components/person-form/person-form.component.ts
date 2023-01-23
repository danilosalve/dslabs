import { Component, OnInit } from '@angular/core';
import { ControlContainer, UntypedFormGroup } from '@angular/forms';

@Component({
  selector: 'app-person-form',
  templateUrl: './person-form.component.html'
})
export class PersonFormComponent implements OnInit {
  form!: UntypedFormGroup;
  constructor(private controlContainer: ControlContainer) { }
  ngOnInit() {
    this.form = this.controlContainer.control as UntypedFormGroup
  }

}
