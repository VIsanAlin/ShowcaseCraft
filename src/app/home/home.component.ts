import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DisplayWorkComponent } from '../display-work/display-work.component';
import { DisplayWork } from '../displaywork';
import { WorkingService } from '../working.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, DisplayWorkComponent],
  template: `
    <section>
      <section class="results">
        <app-display-work
          *ngFor="let displayWork of displayWorkList"
          [displayWork]="displayWork"
        ></app-display-work>
      </section>
    </section>
  `,
  styleUrls: ['./home.component.css'],
})
export class HomeComponent {
  displayWorkList: DisplayWork[] = [];
  workingService: WorkingService = inject(WorkingService);

  constructor() {
    this.workingService.getAllTasks().then((displayWorkList: DisplayWork[]) => {
      this.displayWorkList = displayWorkList;
    });
  }
}
