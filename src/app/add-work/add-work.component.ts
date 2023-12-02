import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { WorkingService } from '../working.service';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
@Component({
  selector: 'app-add-work',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  template: `<article>
    <h2 class="section-heading">Add your newest tasks</h2>
    <form [formGroup]="applyForm" (submit)="submitWork()">
      <label for="title">Title</label>
      <input id="title" type="text" formControlName="title" />
      <label for="description">Description</label>
      <input id="description" type="text" formControlName="description" />
      <label for="linkUrl">Link</label>
      <input id="linkUrl" type="text" formControlName="linkUrl" />
      <label for="imgUrl">Add Images</label>
      <input id="imgUrl" type="text" formControlName="imgUrl" />
      <button type="submit" class="primary">Add new task</button>
    </form>
  </article>`,
  styleUrl: './add-work.component.css',
})
export class AddWorkComponent {
  workingService = inject(WorkingService);

  applyForm = new FormGroup({
    title: new FormControl(''),
    description: new FormControl(''),
    linkUrl: new FormControl(''),
    imgUrl: new FormControl(''),
    hidden: new FormControl(false),
  });

  submitWork() {
    this.workingService.submitWork(
      this.applyForm.value.title ?? '',
      this.applyForm.value.description ?? '',
      this.applyForm.value.linkUrl ?? '',
      this.applyForm.value.imgUrl ?? '',
      (this.applyForm.value.hidden = false)
    );
  }
}
