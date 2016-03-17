import {Component, Input, Output, EventEmitter } from 'angular2/core'

@Component({
  selector: 'todo-item',
  template: `
    <style>
      .completed {
        text-decoration: line-through;
      }
    </style>
    <div>
      <span [ngClass]="todo.status">{{todo.title + ' - ' + todo.status}}</span>
      <button (click)="statusChanged()">Toggle Complete</button>
    </div>
  `
})
export class TodoItem {
  @Input() todo;
  @Output() update = new EventEmitter()
  statusChanged() {
    this.todo.toggle()
    this.update.emit('event', this.todo)
  }
}
