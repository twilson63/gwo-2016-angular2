import { Component, Inject } from 'angular2/core'
import { TodoService } from './todo-service'
import { TodoModel } from './todo-model'

@Component({
  selector: 'todo-input',
  template: `<div>
    <form (submit)="onSubmit($event)">
      <input type="text" [(ngModel)]="todo.title">
    </form>
  </div>`
})
export class TodoInput {
  todoService;
  todo = new TodoModel('');
  constructor(@Inject(TodoService) todoService ) {
    this.todoService = todoService
  }
  onSubmit($event) {
    $event.preventDefault()
    this.todoService.addTodo(this.todo)
    this.todo = new TodoModel('')
  }
}
