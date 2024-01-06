import { Injectable } from '@angular/core';
import { DisplayWork } from './displaywork';

@Injectable({
  providedIn: 'root',
})
export class WorkingService {
  url = 'http://localhost:3005/api/tasks';

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

  // Update Task
  async modifyTask(
    id: number,
    title: string,
    description: string,
    linkUrl: string,
    imgUrl: string,
    hidden: boolean
  ) {
    const updatedTask: DisplayWork = {
      id,
      title,
      description,
      linkUrl,
      imgUrl,
      hidden,
    };

    const updatedUrl = `${this.url}/${id}`;
    await fetch(updatedUrl, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(updatedTask),
    });
  }

  // Delete Task
  async delete(id: number): Promise<void> {
    const deleteUrl = `${this.url}/${id}`;
    await fetch(deleteUrl, {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
    });
  }
}
