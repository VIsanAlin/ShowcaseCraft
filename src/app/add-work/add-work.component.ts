import { CommonModule } from '@angular/common';
import { Component, ViewChild, inject } from '@angular/core';
import { WorkingService } from '../working.service';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';

// import filepond module
import { FilePondModule, registerPlugin } from 'ngx-filepond';
import { FilePondOptions } from 'filepond';

// import and register filepond file type validation plugin
import FilePondPluginFileValidateType from 'filepond-plugin-file-validate-type';
registerPlugin(FilePondPluginFileValidateType);

@Component({
  selector: 'app-add-work',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FilePondModule],
  templateUrl: './add-work.component.html',
  styleUrl: './add-work.component.css',
})
export class AddWorkComponent {
  // File Pond

  //

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
