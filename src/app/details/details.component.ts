import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { WorkingService } from '../working.service';
import { DisplayWork } from '../displaywork';

@Component({
  selector: 'app-details',
  standalone: true,
  imports: [CommonModule],
  template: `<article class="listing">
    <section class="">
      <h2 class="listing-heading">{{ displayWork?.title }}</h2>
      <img
        class="listing-photo"
        [src]="displayWork?.imgUrl"
        alt="{{ displayWork?.title }}"
        crossorigin
      />
    </section>
    <section class="listing-description">
      <p class="listing-location">
        {{ displayWork?.description }}
      </p>
      <p>
        Link :
        <a [href]="displayWork?.linkUrl" target="_blank">
          {{ displayWork?.linkUrl }}
        </a>
      </p>
    </section>
  </article>`,
  styleUrl: './details.component.css',
})
export class DetailsComponent {
  route: ActivatedRoute = inject(ActivatedRoute);
  workingService = inject(WorkingService);
  displayWork: DisplayWork | undefined;

  constructor() {
    const DisplayWorkId = Number(this.route.snapshot.params['id']);
    this.workingService.getTaskById(DisplayWorkId).then((displayWork) => {
      this.displayWork = displayWork;
    });
  }
}
