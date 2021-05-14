import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  title = 'Angular-Rest-Project';

  constructor(private router: Router) {

  }

  ngOnInit(): void {

    if (localStorage.getItem('token') == null) {
      this.router.navigate(['login']);
    }
  }

  public sair(): void {
    localStorage.clear();
    this.router.navigate(['login']);
  }

  public esconderBarra(): boolean {
    // Exibe a barra do menu se o usuario estiver logado, caso contr�rio a barra ser� desativada.
    if (localStorage.getItem('token') !== null && localStorage.getItem('token').toString().trim() !== null) {
      return false;
    } else {
      return true;
    }
  }
}
