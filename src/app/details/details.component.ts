import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { WorkingService } from '../working.service';
import { DisplayWork } from '../displaywork';
import { Router } from '@angular/router';

@Component({
  selector: 'app-details',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './details.component.html',
  styleUrl: './details.component.css',
})
export class DetailsComponent {
  route: ActivatedRoute = inject(ActivatedRoute);
  workingService = inject(WorkingService);
  displayWork: DisplayWork | undefined;
  DisplayWorkId = Number(this.route.snapshot.params['id']);
  constructor(private router: Router) {
    const DisplayWorkId = Number(this.route.snapshot.params['id']);
    this.workingService.getTaskById(DisplayWorkId).then((displayWork) => {
      this.displayWork = displayWork;
    });
  }
  modify() {
    console.log('Redirecting to modify task');
  }
  delete(): void {
    console.log('Delete the task');
    console.log(`${this.DisplayWorkId}`);
    this.workingService.delete(this.DisplayWorkId);

    this.router.navigate(['/']);
  }
}
