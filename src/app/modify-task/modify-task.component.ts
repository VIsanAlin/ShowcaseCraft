import { CommonModule } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { WorkingService } from '../working.service';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
  AbstractControl,
  ValidationErrors,
  ValidatorFn,
} from '@angular/forms';

import {
  HttpClient,
  HttpHeaders,
  HttpClientModule,
} from '@angular/common/http';

import {
  NgxFileDropEntry,
  NgxFileDropModule,
  FileSystemFileEntry,
} from 'ngx-file-drop';

function isValidUrl(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const urlPattern =
      /^(http|https):\/\/[\w-]+(\.[\w-]+)+([\w.,@?^=%&:/~+#-]*[\w@?^=%&/~+#-])?$/;
    const isValid = urlPattern.test(control.value);
    return isValid ? null : { invalidUrl: true };
  };
}

@Component({
  selector: 'app-modify-task',
  standalone: true,
  imports: [
    CommonModule,
    HttpClientModule,
    ReactiveFormsModule,
    NgxFileDropModule,
  ],
  templateUrl: './modify-task.component.html',
  styleUrl: './modify-task.component.css',
})
export class ModifyTaskComponent implements OnInit {
  constructor(
    private router: Router,
    private http: HttpClient,
    private workingService: WorkingService
  ) {}
  route: ActivatedRoute = inject(ActivatedRoute);
  DisplayWorkId = Number(this.route.snapshot.params['id']);

  // Upload
  public files: NgxFileDropEntry[] = [];
  public uploadedImageUrl: string | undefined;

  public dropped(files: NgxFileDropEntry[]) {
    this.files = files;
    for (const droppedFile of files) {
      // Is it a file?
      if (droppedFile.fileEntry.isFile) {
        const fileEntry = droppedFile.fileEntry as FileSystemFileEntry;
        fileEntry.file((file: File) => {
          // Here you can access the real file

          // You could upload it like this:
          const formData = new FormData();
          formData.append('logo', file, droppedFile.relativePath);

          // Headers
          const headers = new HttpHeaders({
            'security-token': 'mytoken',
          });

          this.http
            .post('http://localhost:3005/upload', formData, {
              headers: headers,
              responseType: 'blob',
            })
            .subscribe((data: any) => {
              this.uploadedImageUrl = `http://localhost:3005/uploads/${file.name}`;
              this.modifyForm.patchValue({
                imgUrl: this.uploadedImageUrl,
              });
            });
        });
      } else {
        // It was a directory (empty directories are added, otherwise only files)
        const fileEntry = droppedFile.fileEntry as FileSystemDirectoryEntry;
      }
    }
  }

  public fileOver(event: any) {
    console.log(event);
  }

  public fileLeave(event: any) {
    console.log(event);
  }

  //Form
  modifyForm = new FormGroup({
    id: new FormControl(),
    title: new FormControl('', [Validators.required, Validators.maxLength(20)]),
    description: new FormControl('', [
      Validators.required,
      Validators.maxLength(1000),
    ]),
    linkUrl: new FormControl('', [Validators.required, isValidUrl()]),
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
        this.uploadedImageUrl = task.imgUrl;
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
        this.router.navigate(['/']);
      } else {
        console.log('Form is not valid. Please fill all required fields.');
      }
    }
  }
}
