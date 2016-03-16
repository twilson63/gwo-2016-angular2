# Angular 2

---

### Hello, I am Tom

* @twilson63
* Jack Russell Software/Tabula Rasa Healthcare
* Developer/Instructor
* Teach Kids to code

---

### About you

* How many use Angular?
* How many use other JS Frameworks?

---

## Disclaimer/Perspective

---

### Agenda

* What is Angular 2?
* Why Angular 2?
* Component Model Architecture
* What is a Component?
* Input/Output
* Routing
* Upgrade Paths

---

# What is Angular 2?

---

## One Framework for Mobile and Desktop

---

# Why Angular 2

---

### The framework is faster, more scalable, and more modern. Chances are that organizations that found value in Angular 1.x will find more value in Angular 2.

---

# Component Model Architecture

---

## What is a component in Angular 2

---

```
@Component({
  selector: 'my-component',
  template: '<h1>Component</h1>'
})
export class MyComponent {

}
```

---

## Lets Build a Todo App

---

You can either start with

http://angular2.jsplay.space

or

http://angular2.io Getting Started App

---

### First Component - todo-input.ts

```
import {Component} from 'angular2/core'

@Component({
  selector: 'todo-input',
  template: `<input type="text">
    <button>Click Me!</button>
  `  
})
export class TodoInput {

}
```

---

### Add Component to App

```
...
import {TodoInput} from './todo-input'
...
  {
    selector: 'my-app',
    directives: [TodoInput],
    template: `
      <h1>Todo App</h1>
      <todo-input></todo-input>
    `
  }
```

---

### Events and References

```
  template: `<input type="text" #myInput>
    <button (click)="onClick(myInput.value)">Click Me!</button>
    <br />{{todos | json}}
  `
...
  export class TodoInput {
    todos = [];
    onClick(value) {
      this.todos.push(value)
    }
  }
```

---

### List Component - todo-list.ts

```
import {Component} from 'angular2/core'

@Component({
  selector: 'todo-list',
  template: `
    <ul>
      <li>Item</li>
    </ul>
  `  
})
export class TodoList {

}
```

---

### Add List Component to App - app.ts

### Add Component to App

```
...
import {TodoList} from './todo-list'
...
  {
    selector: 'my-app',
    directives: [TodoInput, TodoList],
    template: `
      <h1>Todo App</h1>
      <todo-input></todo-input>
      <todo-list></todo-list>
    `
  }
```

---

### Add Service - todo-service.ts

```
import {Injectable} from 'angular2/core'

@Injectable()
export class TodoService {
  todos: ['one'];
}
```

---

### Add Service to App - main.ts

```
import {TodoService} from './todo-service'

bootstrap(AppComponent, [TodoService])
```

---

### ngFor - todo-list.ts

```
import { Component, Inject } from 'angular2/core'
import { TodoService } from './todo-service'
...
  template: `
  <ul>
    <li *ngFor="#todo of todoService.todos">{{todo}}</li>
  </ul>
  `
...
  constructor(@Inject(TodoService) todoService) {
    this.todoService = todoService
  }
```

---

### Lets connect Service to Input - todo-input.ts

```
import { Component, Inject } from 'angular2/core'
import { TodoService } from './todo-service'
...
  <form (submit)="onSubmit($event)">
  <input type="text" [(ngModel)]="todo.title">
  </form>
...
 todo = { title: '' }
 constructor(@Inject(TodoService) todoService) {
   this.todoService = todoService
 }
 onSubmit($event) {
   $event.preventDefault()
   this.todoService.todos.push(this.todo.title)
   this.todo = { title: '' }
 }
```

---

### Lets create a TodoModel - todo-model.ts

```
export class TodoModel {
  status: string = 'started';
  title: string;
  constructor(title) {
    this.title = title
  }
  toggle() {
    this.status = this.status == 'completed'
      ? 'started' : 'completed'
  }
}
```

---

### Add the model to the Service - todo-service.ts

```
import { TodoModel } from './todo-model'
...
  todos = [
    new TodoModel('one'),
    new TodoModel('two')
  ]
```

---

### Lets create a TodoItem Component - todo-item.ts

```
import {Component, Input} from 'angular2/core'

@Component({
  selector: 'todo-item',
  template: `
    <span>{{todo.title}}</span>
    <button>Toggle Completed</button>
  `
})
export class TodoItem {
  @Input() todo;
}
```

---

### Lets add TodoItem Component to List - todo-list.ts

```
import {TodoItem} from './todo-item'

  directives: [TodoItem],
  template: `
  <ul>
    <li *ngFor="#todo of todoService.todos">
      <todo-item [todo]="todo"></todo-item>
    </li>
  </ul>
  `
```

---

### ngClass and Todo.toggle - todo-item.ts

```
  template: `
    <style>
      .completed {
        text-decoration: line-through;
      }
    </style>
    <div>
      <span [ngClass]="todo.status">{{todo.title}}</span>
      <button (click)="todo.toggle()">Toggle Complete</button>
    </div>
  `
```

---

### TodoModel map to TodoInput - todo-input.ts

```
import {TodoModel} from './todo-model'

constructor(@Inject(TodoService) todoService) {
  this.todoService = todoService;
  this.todo = new TodoModel('');
}
onSubmit($event) {
  $event.preventDefault()
  this.todoService.todos.push(this.todo)
  this.todo = new TodoModel('')
}

```

---

### Bonus: Add HTTP to TodoService

---

### Bonus2: Write a simple Test
