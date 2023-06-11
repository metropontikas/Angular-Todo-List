import { Component, TemplateRef } from '@angular/core';
import { NgIfContext } from '@angular/common';

import { TodosService } from './todos.service';
import { Item } from './item';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  // Declare elseBlock type
  elseBlock!: TemplateRef<NgIfContext<boolean>> | null;
  // Initialize variable
  allItems: Item[] = [];
  // Filter the todos to display the number of the uncompleted ones
  uncompletedItems: Item[] = [];

  constructor(private todosService: TodosService) {}

  ngOnInit() {
    this.resetList();
  }

  get items() {
    return this.allItems;
  }

  resetList() {
    this.todosService.getAllTodos().subscribe((data) => {
      this.allItems = data;
    });
    this.todosService
      .getAllUncompleted()
      .subscribe((data) => (this.uncompletedItems = data));
  }

  addTodo(value: any) {
    let data = JSON.stringify({
      id: Math.random(),
      title: value,
      completed: false,
    });

    this.todosService.postTodo(data).subscribe();
    this.allItems.push(JSON.parse(data));
    this.uncompletedItems.push(JSON.parse(data));
  }

  deleteTodo(id: Item['id']) {
    this.allItems = this.allItems.filter((todo) => todo.id != id);
    this.uncompletedItems = this.allItems.filter((todo) => todo.id != id);

    this.todosService.deleteTodo(id).subscribe();
  }

  handleCompletedStatus(todo: Item) {
    let data = JSON.stringify({
      ...todo,
      completed: !todo.completed,
    });

    this.todosService.updateTodo(data, todo.id).subscribe();

    this.allItems = this.allItems.map((item) =>
      item.id === todo.id ? { ...item, completed: !item.completed } : item
    );

    this.uncompletedItems = this.allItems.filter(
      (item) => item.completed === false
    );
  }

  todoNameChangeHandler(todo: Item) {
    let data = JSON.stringify({
      ...todo,
      title: todo.title,
    });

    this.todosService.updateTodo(data, todo.id).subscribe();
  }

  filterTodosByName(text: Item['title']) {
    this.todosService.filterTodos('title', text).subscribe((res) => {
      this.allItems = res;
      this.uncompletedItems = this.allItems.filter(
        (item) => item.completed === false
      );
    });
  }
}
