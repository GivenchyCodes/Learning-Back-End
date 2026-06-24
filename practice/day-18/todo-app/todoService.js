import { Todo } from './todoModel.js';
export class TodoService {
  constructor() { this.todos = []; }
  addTodo(task) {
    const todo = new Todo(this.todos.length + 1, task);
    this.todos.push(todo);
    return todo;
  }
  toggleTodo(id) {
    const todo = this.todos.find(t => t.id === id);
    if (todo) todo.completed = !todo.completed;
  }
  getTodos() { return this.todos; }
}
