import { Injectable } from '@angular/core';
import { DisplayWork } from './displaywork';

@Injectable({
  providedIn: 'root',
})
export class WorkingService {
  url = 'http://localhost:3000/tasks';

  async getAllTasks(): Promise<DisplayWork[]> {
    const data = await fetch(this.url);
    return (await data.json()) ?? [];
  }

  async getTaskById(id: number): Promise<DisplayWork | undefined> {
    const data = await fetch(`${this.url}/${id}`);
    return (await data.json()) ?? [];
  }

  // Adding New Tasks
  async submitWork(
    title: string,
    description: string,
    linkUrl: string,
    imgUrl: string,
    hidden: boolean
  ): Promise<void> {
    const newTask: DisplayWork = {
      id: this.generateRandomId(),
      title,
      description,
      linkUrl,
      imgUrl,
      hidden,
    };
    await fetch(this.url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newTask),
    });
  }
  private generateRandomId(): number {
    return Math.floor(Math.random() * 1000);
  }

  // Delete Task

  delete() {
    console.log('Delete the task');
  }
}
