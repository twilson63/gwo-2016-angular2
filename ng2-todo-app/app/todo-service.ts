import {Injectable, Inject} from 'angular2/core'
import {TodoModel} from './todo-model'
import {Http, Headers} from 'angular2/http'

@Injectable()
export class TodoService {
  todos;
  http;
  constructor(@Inject(Http) http) {
    this.http = http
    this.loadDocs()
  }
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
}
