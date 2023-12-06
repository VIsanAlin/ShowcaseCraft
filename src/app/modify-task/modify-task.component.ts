import { CommonModule } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { WorkingService } from '../working.service';
@Component({
  selector: 'app-modify-task',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './modify-task.component.html',
  styleUrl: './modify-task.component.css',
})
export class ModifyTaskComponent implements OnInit {
  route: ActivatedRoute = inject(ActivatedRoute);
  workingService = inject(WorkingService);
  DisplayWorkId = Number(this.route.snapshot.params['id']);

  modifyForm = new FormGroup({
    id: new FormControl(),
    title: new FormControl('', Validators.required),
    description: new FormControl('', Validators.required),
    linkUrl: new FormControl('', Validators.required),
    imgUrl: new FormControl('', Validators.required),
    hidden: new FormControl(false),
  });

  ngOnInit() {
    // Fetch the task data based on DisplayWorkId
    this.workingService.getTaskById(this.DisplayWorkId).then((task) => {
      if (task) {
        // Populate the form controls with the fetched data
        this.modifyForm.patchValue({
          id: task.id,
          title: task.title,
          description: task.description,
          linkUrl: task.linkUrl,
          imgUrl: task.imgUrl,
          hidden: task.hidden,
        });
      }
    });
  }
  modifyTask() {
    {
      if (this.modifyForm.valid) {
        this.workingService.modifyTask(
          (this.modifyForm.value.id = this.DisplayWorkId),
          this.modifyForm.value.title ?? '',
          this.modifyForm.value.description ?? '',
          this.modifyForm.value.linkUrl ?? '',
          this.modifyForm.value.imgUrl ?? '',
          (this.modifyForm.value.hidden = false)
        );
      } else {
        console.log('Form is not valid. Please fill all required fields.');
      }
    }
  }
}
