import { Injectable } from '@angular/core';
import { Todo } from '../models/Todo';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class TodoService {
  constructor(private http: HttpClient) {}

  findAll(): Observable<Todo[]> {
    const url = 'http://localhost:3000/todos';
    return this.http.get<Todo[]>(url);
  }

  setCompleted(id: number, completed: boolean): Observable<Todo> {
    const url = `http://localhost:3000/todos/${id}`;
    return this.http.patch<Todo>(url, { completed });
  }
}
