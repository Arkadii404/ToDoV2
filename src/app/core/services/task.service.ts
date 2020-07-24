import { IServerListService } from './../interfaces/server-list.service.interface';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { map } from 'rxjs/operators';
import { CoreModels } from '../models';
import { ApiService } from './api.service';
import { StorageService } from './storage.service';

@Injectable({
  providedIn: 'root'
})
export class TaskService implements IServerListService<CoreModels.ITask> {

  public addTasksSubject$ = new Subject<CoreModels.ITask>();

  public removeSubject$ = new Subject<number>();

  constructor(
    private readonly apiService: ApiService,
    private readonly storageService: StorageService
  ) { }

  public get(): Observable<CoreModels.ITask[]> {
    return this.apiService.request('GET', 'tasks', {});
  }

  public getTusksOfCurrentUser(): Observable<CoreModels.ITask[]> {
    return this.get().pipe(
      map((tasks: CoreModels.ITask[]) => tasks.filter(task => task.userId === this.storageService.userId))
    );
  }

  public getDetails(id: number): Observable<CoreModels.ITask> {
    return this.apiService.request('GET', `tasks/${id}`, {})
  }

  public setTask(task: CoreModels.ITask): Observable<CoreModels.ITask> {
    return this.apiService.request('POST', 'tasks', task)
  }

  public removeTask(id: number): Observable<CoreModels.ITask> {
    return this.apiService.request('DELETE', `tasks/${id}`, {});
  }

  public updateTask(id: number, dto: CoreModels.IUpdateTask) {
    return this.apiService.request('PATCH', `tasks/${id}`, dto);
  }

}
