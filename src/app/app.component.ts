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
    this.todosService.getAllTodos().subscribe((data) => {
      this.allItems = data;
    });
    this.todosService
      .getAllUncompleted()
      .subscribe((data) => (this.uncompletedItems = data));
  }

  get items() {
    return this.allItems;
  }
  submitData(value: any) {
    let data = JSON.stringify({
      id: Math.random(),
      title: value,
      completed: false,
    });

    this.todosService.postTodo(data).subscribe();
  }

  deleteTodo(id: Item['id']) {
    this.todosService.deleteTodo(id).subscribe();
  }

  handleCompletedStatus(todo: Item) {
    let data = JSON.stringify({
      ...todo,
      completed: !todo.completed,
    });
    this.todosService.updateTodo(data, todo.id).subscribe();
  }

  todoNameChangeHandler(todo: Item) {
    let data = JSON.stringify({
      ...todo,
      title: todo.title,
    });
    this.todosService.updateTodo(data, todo.id).subscribe();
  }
}
