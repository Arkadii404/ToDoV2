import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { CoreModels } from '../models';
import { ApiService } from './api.service';
import { StorageService } from './storage.service';

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  constructor(
    private readonly apiService: ApiService,
    private readonly storageService: StorageService
  ) { }

  public getAllTasks(): Observable<CoreModels.ITask[]> {
    return this.apiService.request('GET', 'tasks', {});
  }

  public getTusksOfCurrentUser(): Observable<CoreModels.ITask[]> {
    return this.getAllTasks().pipe(
      map((tasks: CoreModels.ITask[]) => tasks.filter(task => task.userId === this.storageService.userId))
    );
  }

  public getTask(id: number): Observable<CoreModels.ITask> {
    return this.apiService.request('GET', `tasks/${id}`, {})
  }

  public setTask(task: CoreModels.ITask): Observable<CoreModels.ITask> {
    return this.apiService.request('POST', 'tasks', task)
  }
}
