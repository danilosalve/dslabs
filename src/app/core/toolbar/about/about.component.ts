import { Component } from '@angular/core';
import { PoInfoOrientation } from '@po-ui/ng-components';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html'
})
export class AboutComponent {
  orientation: PoInfoOrientation = PoInfoOrientation.Horizontal;
  constructor() { }
}
