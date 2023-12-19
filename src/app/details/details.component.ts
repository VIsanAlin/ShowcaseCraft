import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { WorkingService } from '../working.service';
import { DisplayWork } from '../displaywork';
import { Router } from '@angular/router';
import {
  MatDialog,
  MatDialogRef,
  MatDialogActions,
  MatDialogClose,
  MatDialogTitle,
  MatDialogContent,
} from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';

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
  constructor(private router: Router, private dialog: MatDialog) {
    const DisplayWorkId = Number(this.route.snapshot.params['id']);
    this.workingService.getTaskById(DisplayWorkId).then((displayWork) => {
      this.displayWork = displayWork;
    });
  }

  openDialog(
    enterAnimationDuration: string,
    exitAnimationDuration: string
  ): void {
    this.dialog.open(DeleteConfirmationDialog, {
      width: '250px',
      enterAnimationDuration,
      exitAnimationDuration,
    });
  }

  modify() {
    console.log('Redirecting to modify task');
  }
  delete(): void {
    const dialogRef = this.dialog.open(DeleteConfirmationDialog, {
      width: '250px',
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        console.log('Deleting the task...');
        this.workingService.delete(this.DisplayWorkId);
        this.router.navigate(['/']);
      } else {
        console.log('Cancelled delete operation.');
      }
    });
  }
}

@Component({
  selector: 'delete-confirmation-dialog',
  template: `
    <h1 mat-dialog-title>Delete Task</h1>
    <div mat-dialog-content>Would you like to delete this task?</div>
    <div mat-dialog-actions>
      <button mat-button mat-dialog-close>No</button>
      <button mat-button (click)="onYesClick()" cdkFocusInitial>Yes</button>
    </div>
  `,
  standalone: true,
  imports: [
    MatButtonModule,
    MatDialogActions,
    MatDialogClose,
    MatDialogTitle,
    MatDialogContent,
  ],
})
export class DeleteConfirmationDialog {
  constructor(public dialogRef: MatDialogRef<DeleteConfirmationDialog>) {}

  onYesClick(): void {
    this.dialogRef.close(true);
  }
}
