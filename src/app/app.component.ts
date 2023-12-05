import { Component } from '@angular/core';
import { HomeComponent } from './home/home.component';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterModule, HomeComponent],
  template: `
    <main>
      <section class="navbar">
        <ul class="navbar-content">
          <li>
            <a [routerLink]="['/']"> Display Current Tasks </a>
          </li>
          <li>
            <a [routerLink]="['/add']">Adding Tasks </a>
          </li>
        </ul>
      </section>

      <section class="content">
        <router-outlet></router-outlet>
      </section>
    </main>
  `,
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'Homepage';
}
