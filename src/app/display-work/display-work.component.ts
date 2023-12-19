import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DisplayWork } from '../displaywork';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-display-work',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './display-work.component.html',
  styleUrl: './display-work.component.css',
})
export class DisplayWorkComponent {
  @Input() displayWork!: DisplayWork;

  @Input() isGridView = true;
}
