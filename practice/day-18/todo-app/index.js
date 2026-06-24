import { TodoService } from './todoService.js';
import { renderTodoList } from './todoView.js';

const app = new TodoService();
app.addTodo('Learn Modular JS Patterns');
app.toggleTodo(1);
renderTodoList(app.getTodos());
