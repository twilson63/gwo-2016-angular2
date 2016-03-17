! https://raw.githubusercontent.com/twilson63/gwo-2016-angular2/master/ng2-view.jpg

---

### Hello, I am Tom

* @twilson63
* Jack Russell Software/Tabula Rasa Healthcare
* Developer/Instructor
* <3 JavaScript <3 NodeJS <3 CouchDB

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

# Why Angular 2?

---

### The framework is faster, more scalable, and more modern. Chances are that organizations that found value in Angular 1.x will find more value in Angular 2.

---

# Component Model Architecture

---

### What is a component in Angular 2

```
@Component({
  selector: 'my-component',
  template: '<h1>Component</h1>'
})
export class MyComponent {

}
```

---

# A Todo App

---

### Component and Template

In angular2 the template can be included within the component annotation or
can be a html file path using the `templateUrl` node.

---

### Event Handlers

Using the property name you want to handle assigned to an expression. The
'()' indicates event handler.

```
<button (click)="onClick()">Click Me!</button>
```

---

### References

Using the '#' symbol plus an unique name, creates a reference to the HTML Element
within the component.

```
<input type="text" #myInput>
<button (click)="onClick(myInput.value)">Click Me!</button>
```

---

### Pipes

A new name for filters and work very similar:

```
{{todos | json}}
```

---

### ngFor

Then new ng-repeat - or structural directive

```
<ul>
  <li *ngFor="#todo of todos">{{todo}}</li>
</ul>
```

---

### Services and Providers

A service is just a class or function with Injectable decorator

```
@Injectable()
export class TodoService {

}
```

---

### ngModel

ngModel established two-way data-binding using both the '[]' and '()'

```
  <form (submit)="onSubmit($event)">
    <input type="text" [(ngModel)]="todo.title">
  </form>
```

---

### Models

You can define and implement models easier with ES6 and TypeScript

```
export class TodoModel {

}
```

---

### Inputs

You can create inputs that enable values to be passed down from parent
components via '[]' properties.

```
<todo-item [todo]="todo"></todo-item>
```

---

### ngClass directive

With ngClass you can modify the presentation with expressions

```
<style>
  .completed {
    text-decoration: line-through;
  }
</style>
<span [ngClass]="todo.status">{{todo.title}}</span>
```
---

### Custom events with EventEmitter

```
<todo-item (update)="update(todo)"></todo-item>
...
export class TodoItem {
  update = new EventEmitter()
  onUpdate() {
    update.emit('event')
  }
}
```

---

### Http Provider

The Http provider returns Rx Observables.

```
http.get('/foo.json')
  .subscribe(res => {
    const body = res.json()
  })
```

---

### Router

The router is another provider and set of directives to create linkable components.

```
@Component({
	selector: 'my-app',
	providers: [ROUTER_PROVIDERS],
	directives: [ROUTER_DIRECTIVES],
	template: `
	  <h1>My First Angular 2 App</h1>
	  <a [routerLink]="['Home']">Home</a>
	  <a [routerLink]="['About']">About</a>
	  <router-outlet></router-outlet>
	`
})
```
