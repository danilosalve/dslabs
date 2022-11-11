import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';

@Component({
  selector: 'app-access-denied',
  templateUrl: './access-denied.component.html',
  styleUrls: ['./access-denied.component.css']
})
export class AccessDeniedComponent implements OnInit {

  constructor(
    protected titleService: Title,
    private router: Router
  ) { }

  ngOnInit() {
    this.onInitPage();
  }

  onInitPage(): void {
    this.titleService.setTitle('DSLABS | Acesso Negado');
  }

  goToHome(): void {
    this.router.navigate(['/']);
  }

}
