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
      class="task"
      [ngClass]="{ 'grid-view': isGridView, 'list-view': !isGridView }"
    >
      <img
        class="task-photo"
        [src]="displayWork.imgUrl"
        alt=" {{ displayWork.title }}"
        crossorigin
      />
      <div class="task-content">
        <p class="task-title">{{ displayWork.title }}</p>
        <p class="task-description">
          {{ displayWork.description }}
        </p>
        <a [href]="displayWork.linkUrl" target="_blank">Customer Link </a>
        <a
          [routerLink]="['/details', displayWork.id]"
          routerLinkActive="router-link-active"
          >Learn More
        </a>
      </div>
    </section>
  `,
  styleUrl: './display-work.component.css',
})
export class DisplayWorkComponent {
  @Input() displayWork!: DisplayWork;

  @Input() isGridView = true;
}
