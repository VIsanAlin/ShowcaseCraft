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
      <section class="list-grid">
        <button (click)="toggleViewMode()" class="activeView">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            height="24"
            viewBox="0 -960 960 960"
            width="24"
          >
            <path
              d="M200-120q-33 0-56.5-23.5T120-200v-560q0-33 23.5-56.5T200-840h560q33 0 56.5 23.5T840-760v560q0 33-23.5 56.5T760-120H200Zm0-80h240v-560H200v560Zm320 0h240v-280H520v280Zm0-360h240v-200H520v200Z"
            />
          </svg>
        </button>
        <hr />
        <button (click)="toggleViewMode()" class="">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            height="24"
            viewBox="0 -960 960 960"
            width="24"
          >
            <path
              d="M280-600v-80h560v80H280Zm0 160v-80h560v80H280Zm0 160v-80h560v80H280ZM160-600q-17 0-28.5-11.5T120-640q0-17 11.5-28.5T160-680q17 0 28.5 11.5T200-640q0 17-11.5 28.5T160-600Zm0 160q-17 0-28.5-11.5T120-480q0-17 11.5-28.5T160-520q17 0 28.5 11.5T200-480q0 17-11.5 28.5T160-440Zm0 160q-17 0-28.5-11.5T120-320q0-17 11.5-28.5T160-360q17 0 28.5 11.5T200-320q0 17-11.5 28.5T160-280Z"
            />
          </svg>
        </button>
      </section>
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

  toggleViewMode() {
    console.log(`Changing view mode`);
  }
  constructor() {
    this.workingService.getAllTasks().then((displayWorkList: DisplayWork[]) => {
      this.displayWorkList = displayWorkList;
    });
  }
}
