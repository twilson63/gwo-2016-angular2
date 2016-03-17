import { Component, Inject } from 'angular2/core'
import { TodoService } from './todo-service'
import { TodoItem } from './todo-item'

@Component({
  selector: 'todo-list',
  directives: [TodoItem],
  template: `
    <ul>
      <li *ngFor="#todo of todoService.todos">
        <todo-item [todo]="todo" (update)="updateTodo(todo)"></todo-item>
      </li>
    </ul>
    <button (click)="todoService.removeCompleted()">Remove Completed</button>
  `
})

export class TodoList {
  constructor(@Inject(TodoService) todoService) {
    this.todoService = todoService
  }
  updateTodo(todo) {
    this.todoService.updateTodo(todo)
  }
}
