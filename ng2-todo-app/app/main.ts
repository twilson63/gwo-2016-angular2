import {bootstrap}    from 'angular2/platform/browser'
import {AppComponent} from './app'
import {TodoService} from './todo-service'
import {HTTP_PROVIDERS} from 'angular2/http'

bootstrap(AppComponent, [TodoService, HTTP_PROVIDERS]);
    
