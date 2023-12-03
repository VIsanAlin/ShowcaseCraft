import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { WorkingService } from '../working.service';
@Component({
  selector: 'app-modify-task',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './modify-task.component.html',
  styleUrl: './modify-task.component.css',
})
export class ModifyTaskComponent {
  route: ActivatedRoute = inject(ActivatedRoute);
  workingService = inject(WorkingService);
  DisplayWorkId = Number(this.route.snapshot.params['id']);

  modifyForm = new FormGroup({
    id: new FormControl(),
    title: new FormControl(''),
    description: new FormControl(''),
    linkUrl: new FormControl(''),
    imgUrl: new FormControl(''),
    hidden: new FormControl(false),
  });

  modifyTask() {
    {
      this.workingService.modifyTask(
        (this.modifyForm.value.id = this.DisplayWorkId),
        this.modifyForm.value.title ?? '',
        this.modifyForm.value.description ?? '',
        this.modifyForm.value.linkUrl ?? '',
        this.modifyForm.value.imgUrl ?? '',
        (this.modifyForm.value.hidden = false)
      );
    }
  }
}
