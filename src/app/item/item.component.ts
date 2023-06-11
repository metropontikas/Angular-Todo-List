import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Item } from '../item';

@Component({
  selector: 'app-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.scss'],
})
export class ItemComponent {
  editable = false;

  @Input() item!: Item;
  @Output() deleteTodo = new EventEmitter<Item>();
  @Output() handleCompletedStatus = new EventEmitter<Item>();
  @Output() todoNameChangeHandler = new EventEmitter();

  saveItem(title: string, item: Item) {
    // TODO: instead return an alert to populate the input
    if (!title) return;
    this.editable = false;
    this.item.title = title;
    this.todoNameChangeHandler.emit(this.item.title);
  }
}
