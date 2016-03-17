export class TodoModel {
  title: string;
  status: string = 'started';
  constructor(title) {
    this.title = title
  }
  toggle() {
    this.status = this.status == 'completed'
      ? 'started' : 'completed'
  }
}
