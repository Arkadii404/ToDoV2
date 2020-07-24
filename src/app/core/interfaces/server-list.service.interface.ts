import { Observable } from 'rxjs';
export interface IServerListService<T> {
    get(): Observable<T[]>;

    getDetails(id: number): Observable<T>;
}