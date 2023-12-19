import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DisplayWorkComponent } from '../display-work/display-work.component';
import { DisplayWork } from '../displaywork';
import { WorkingService } from '../working.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, DisplayWorkComponent],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent {
  displayWorkList: DisplayWork[] = [];
  workingService: WorkingService = inject(WorkingService);
  viewMode: 'grid' | 'list' = 'grid';
  showOnlyHidden = false;

  toggleViewMode(mode: 'grid' | 'list') {
    this.viewMode = mode;

    console.log(this.viewMode);
  }

  toggleCustom() {
    this.showOnlyHidden = !this.showOnlyHidden;

    if (this.showOnlyHidden) {
      // If showOnlyHidden is true, filter the list to show only hidden items
      console.log(this.viewMode);
      this.workingService
        .getAllTasks()
        .then((displayWorkList: DisplayWork[]) => {
          this.displayWorkList = displayWorkList.filter(
            (item) => item.hidden === false
          );
        });
    } else {
      // If showOnlyHidden is false, reset the list to the original displayWorkList
      this.workingService
        .getAllTasks()
        .then((displayWorkList: DisplayWork[]) => {
          this.displayWorkList = displayWorkList;
        });
    }

    console.log(this.showOnlyHidden);
  }

  constructor() {
    this.workingService.getAllTasks().then((displayWorkList: DisplayWork[]) => {
      this.displayWorkList = displayWorkList;
    });
  }
}
