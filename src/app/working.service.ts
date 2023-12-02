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

  submitWork(
    title: string,
    description: string,
    linkUrl: string,
    imgUrl: string,
    hidden: boolean
  ) {
    console.log(
      `Submited Work : title: ${title} description: ${description} linkUrl: ${linkUrl}
      imgUrl: ${imgUrl} hidden: ${hidden}`
    );
  }
}
