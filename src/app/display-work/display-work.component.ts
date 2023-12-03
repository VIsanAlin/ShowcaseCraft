import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DisplayWork } from '../displaywork';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-display-work',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <section
      class="listing"
      [ngClass]="{ 'grid-view': isGridView, 'list-view': !isGridView }"
    >
      <img
        class="listing-photo"
        [src]="displayWork.imgUrl"
        alt=" {{ displayWork.title }}"
        crossorigin
      />
      <h2 class="listing-heading">{{ displayWork.title }}</h2>
      <p class="listing-location">
        {{ displayWork.description }}, {{ displayWork.linkUrl }}
      </p>
      <a
        [routerLink]="['/details', displayWork.id]"
        routerLinkActive="router-link-active"
        >Learn More
      </a>
    </section>
  `,
  styleUrl: './display-work.component.css',
})
export class DisplayWorkComponent {
  @Input() displayWork!: DisplayWork;

  isGridView = true;
  toggleViewMode() {
    this.isGridView = !this.isGridView;
  }
}
