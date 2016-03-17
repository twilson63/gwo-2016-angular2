import {Component} from 'angular2/core';
import {TodoInput} from './todo-input'
import {TodoList} from './todo-list'

@Component({
	selector: 'my-app',
	directives: [TodoInput, TodoList],
	template: `
	  <h1>My First Angular 2 Todo App</h1>
	  <todo-input></todo-input>
	  <todo-list></todo-list>
	`
})
export class AppComponent { }
    
