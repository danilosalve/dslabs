import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html'
})
export class HomeComponent implements OnInit {

  constructor(
    private titleService: Title
  ) { }

  ngOnInit() {
    this.onInitPage();
  }

  onInitPage(): void {
    this.setPageTitle('Meus Indicadores');
  }

  setPageTitle(title: string): void {
    this.titleService.setTitle(`DSLABs | ${title}`);
  }
}
