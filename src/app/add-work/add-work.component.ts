import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { WorkingService } from '../working.service';
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
  selector: 'app-add-work',
  standalone: true,
  imports: [
    CommonModule,
    HttpClientModule,
    ReactiveFormsModule,
    NgxFileDropModule,
  ],
  templateUrl: './add-work.component.html',
  styleUrl: './add-work.component.css',
})
export class AddWorkComponent {
  constructor(
    private workingService: WorkingService,
    private router: Router,
    private http: HttpClient
  ) {}

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
              this.applyForm.patchValue({
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
  applyForm = new FormGroup({
    title: new FormControl('', [Validators.required, Validators.maxLength(20)]),
    description: new FormControl('', [
      Validators.required,
      Validators.maxLength(1000),
    ]),
    linkUrl: new FormControl('', [Validators.required, isValidUrl()]),
    imgUrl: new FormControl('', [Validators.required]),
    hidden: new FormControl(false),
  });

  submitWork() {
    if (this.applyForm.valid) {
      this.workingService.submitWork(
        this.applyForm.value.title ?? '',
        this.applyForm.value.description ?? '',
        this.applyForm.value.linkUrl ?? '',
        this.applyForm.value.imgUrl ?? '',
        this.applyForm.value.hidden ?? false
      );

      this.router.navigate(['/']);
    } else {
      console.log('Form is invalid. Please fill in all required fields.');
    }
  }
}
