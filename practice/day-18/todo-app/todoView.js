export function renderTodoList(todos) {
  console.log('--- Task 5: Modular Todo App Output ---');
  if (todos.length === 0) return console.log('No tasks!');
  todos.forEach(t => console.log(`[${t.completed ? '✅' : '❌'}] ID ${t.id}: ${t.task}`));
  console.log('--------------------------------------\n');
}
