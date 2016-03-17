import {Component} from 'angular2/core';
import { RouteConfig, ROUTER_DIRECTIVES, ROUTER_PROVIDERS } from 'angular2/router'
import {HomeComponent} from './home-component'
import {AboutComponent} from './about-component'

@RouteConfig([{
  path: '/',
  name: 'Home',
  component: HomeComponent
}, {
  path: '/about',
  name: 'About',
  component: AboutComponent
}])
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
export class AppComponent { }
    
