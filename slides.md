! http://i1-news.softpedia-static.com/images/news2/angularjs-2-roadmap-update-es5-es6-and-typescript-support-485375-2.jpg

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
* Events
* Services/Injectables
* ngFor
* Inputs
* ngClass
* ngModel

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

## Build a Todo App

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

```
import {Component} from 'angular2/core';
import {TodoInput} from './todo-input'
import {TodoList} from './todo-list'

@Component({
	selector: 'my-app',
	directives: [TodoInput, TodoList],
	template: `
	  <h1>Todo App</h1>
	  <todo-input></todo-input>
	  <todo-list></todo-list>
	`
})
export class AppComponent { }
```

---

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

### Connect Service to Input - todo-input.ts

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

### Create a TodoModel - todo-model.ts

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

### Add Model to Svc - todo-service.ts

```
import { TodoModel } from './todo-model'
...
  todos = [
    new TodoModel('one'),
    new TodoModel('two')
  ]
```

---

### Create a TodoItem - todo-item.ts

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

### Add TodoItem to List - todo-list.ts

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

### ngClass - todo-item.ts

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

### TodoModel to TodoInput - todo-input.ts

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

### Bonus1: HTTP - todo-service.js

---

### Step 1 - index.html

```
<script src="https://code.angularjs.org/2.0.0-beta.9/http.dev.js"></script>
```

---

### Step 2 - main.ts

```
import {HTTP_PROVIDERS} from 'angular2/http'

bootstrap(AppComponent, [TodoService, HTTP_PROVIDERS])
```

---

### Step 3a - todo-services.ts

```
export class TodoService {
  todos;
  http;
  constructor(@Inject(Http) http) {
    this.http = http
    this.loadDocs()
  }
  loadDocs() {
    this.http.get('https://pouchdb.herokuapp.com/todos/_all_docs?include_docs=true')
      .subscribe(res => {
        this.todos = res.json().rows.map( r => {
          const todo = new TodoModel(r.doc.title)
          todo.status = r.doc.status
          todo._id = r.doc._id
          todo._rev = r.doc._rev
          return todo
        })
      })
  }
...
}
```

---

### Step 3b - todo-services.ts

```
addTodo(todo) {
  const todoJSON = JSON.stringify({title: todo.title, status: todo.status})
  const headers = new Headers()
  headers.append('Content-Type', 'application/json')

  this.http.post('https://pouchdb.herokuapp.com/todos', todoJSON, {
    headers
  })
    .subscribe(res => {
      if (res.json().ok) {
        this.loadDocs()
      }
    })
}
```

---

### Step 3c - todo-services.ts

```
updateTodo(todo) {
  const todoJSON = JSON.stringify({
    _id: todo._id,
    _rev: todo._rev,
    title: todo.title,
    status: todo.status})

  const headers = new Headers()
  headers.append('Content-Type', 'application/json')

  this.http.put('https://pouchdb.herokuapp.com/todos/' + todo._id, todoJSON, {
    headers: headers
  })
    .subscribe(res => {
      if (res.json().ok) {
        this.loadDocs()
      }
    })
}
```

---

### Step 3d - todo-service.ts

```
removeCompleted() {
  const completed = this.todos
    .filter(todo => todo.status === 'completed')
    .map(todo => {
      todo._deleted = true
      return todo
    })
  const headers = new Headers()
  headers.append('Content-Type', 'application/json')
  const completedJSON = JSON.stringify({ docs: completed})
  this.http.post('https://pouchdb.herokuapp.com/todos/_bulk_docs', completedJSON, {
    headers
  })
    .subscribe(res => {
      this.loadDocs()
    })
}
```

---

### Step 4 - todo-list

```
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
...
```

---

### Bonus2: Routing - app.js

```
// index.html
<head>
  <base href="/">
</head>
<body>
...
<script src="https://code.angularjs.org/2.0.0-beta.9/router.dev.js"></script>
</body>
```

---

### Router Step 2

```
// app.ts
import {RouteConfig, ROUTER_DIRECTIVES, ROUTER_PROVIDERS} from 'angular2/router'

@Component({
  directives: [ROUTER_DIRECTIVES],
  providers: [
    ROUTER_PROVIDERS
  ],
  template: `
  <h1>Title</h1>
  <nav>
    <a [routerLink]="['Home']">Home</a>
    <a [routerLink]="['About']">About</a>
  </nav>
  <router-outlet></router-outlet>
  `
})
@RouteConfig([{
  path: '/',
  name: 'Home',
  component: HomeComponent  
}, {
  path: '/about',
  name: 'About',
  component: AboutComponent
}])
export class App {

}

```
