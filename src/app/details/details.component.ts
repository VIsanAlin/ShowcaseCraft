import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { WorkingService } from '../working.service';
import { DisplayWork } from '../displaywork';

@Component({
  selector: 'app-details',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './details.component.html',
  styleUrl: './details.component.css',
})
export class DetailsComponent {
  route: ActivatedRoute = inject(ActivatedRoute);
  workingService = inject(WorkingService);
  displayWork: DisplayWork | undefined;
  DisplayWorkId = Number(this.route.snapshot.params['id']);
  constructor() {
    const DisplayWorkId = Number(this.route.snapshot.params['id']);
    this.workingService.getTaskById(DisplayWorkId).then((displayWork) => {
      this.displayWork = displayWork;
    });
  }
  delete() {
    console.log('Delete the task');
    console.log(`${this.DisplayWorkId}`);
  }
}
