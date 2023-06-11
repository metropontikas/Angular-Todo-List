import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Item } from './item';

const headers = { 'Content-type': 'application/json; charset=UTF-8' };

@Injectable({
  providedIn: 'root',
})
export class TodosService {
  private baseURL = `https://instinctive-fork-snarl.glitch.me/todos/`;
  constructor(private http: HttpClient) {}

  getAllTodos(): Observable<any> {
    return this.http.get(`${this.baseURL}`);
  }

  getAllUncompleted(): Observable<any> {
    return this.http.get(`${this.baseURL}?completed=false`);
  }

  postTodo(data: any): Observable<any> {
    return this.http.post(`${this.baseURL}`, data, { headers });
  }

  updateTodo(data: any, id: Item['id']): Observable<any> {
    return this.http.put(`${this.baseURL}${id}`, data, { headers });
  }

  deleteTodo(id: Item['id']): Observable<any> {
    return this.http.delete(`${this.baseURL}/${id}`);
  }

  filterTodos(key: any, value: any): Observable<any> {
    return this.http.get(`${this.baseURL}?${key}=${value}`);
  }
}
