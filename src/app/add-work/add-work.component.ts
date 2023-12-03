import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { WorkingService } from '../working.service';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';

@Component({
  selector: 'app-add-work',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  template: `<article>
    <h2 class="section-heading">Add New Task</h2>
    <form [formGroup]="applyForm" (submit)="submitWork()" novalidate>
      <label for="title">Title</label>
      <input id="title" type="text" formControlName="title" />
      <!-- Add required validator for other input fields as needed -->
      <label for="description">Description</label>
      <input id="description" type="text" formControlName="description" />
      <label for="linkUrl">Link</label>
      <input id="linkUrl" type="text" formControlName="linkUrl" />
      <label for="imgUrl">Add Images</label>
      <input id="imgUrl" type="text" formControlName="imgUrl" />
      <button type="submit" class="primary" [disabled]="!applyForm.valid">
        Add new task
      </button>
    </form>
  </article>`,
  styleUrl: './add-work.component.css',
})
export class AddWorkComponent {
  workingService = inject(WorkingService);

  applyForm = new FormGroup({
    title: new FormControl('', Validators.required),
    description: new FormControl('', Validators.required),
    linkUrl: new FormControl('', Validators.required),
    imgUrl: new FormControl('', Validators.required),
    hidden: new FormControl(false),
  });

  submitWork() {
    if (this.applyForm.valid) {
      this.workingService.submitWork(
        this.applyForm.value.title ?? '',
        this.applyForm.value.description ?? '',
        this.applyForm.value.linkUrl ?? '',
        this.applyForm.value.imgUrl ?? '',
        (this.applyForm.value.hidden = false)
      );

      // Optionally reset the form after submission
      this.applyForm.reset();
    } else {
      // Handle invalid form submission (optional)
      console.log('Form is invalid. Please fill in all required fields.');
    }
  }
}
