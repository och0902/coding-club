document.addEventListener('DOMContentLoaded', readTodos);

function readTodos() {
   const storage = localStorage.getItem('todos');
   const todosData = storage ? JSON.parse(storage) : [];
   
   let elements = '';
   if (todosData.length > 0) {
      todosData.forEach((todoData) => {
         const date = new Date(todoData.at);
         const formattedDate = date.toLocaleString();

         elements += `
            <tr>
               <td>
                  <input type='checkbox' ${todoData.check ? 'checked' : ''} onclick='handleCheck(event, ${todoData.id})'>
               </td>
               <td ${todoData.check ? 'class="todo checked"' : 'class="todo"'}>${todoData.todo}</td>
               <td ${todoData.check ? 'class="at checked"' : 'class="at"'}>${formattedDate.replace(/\s+/g, '')}</td>
               <td>
                  <button type='button' onclick='showUpdateForm(${todoData.id})'>
                     <img src="images/icons8-edit-48.png" alt="update">
                  </button>
                  <button type='button' onclick='deleteTodo(${todoData.id})'>
                     <img src="images/icons8-trash-64.png" alt="update">
                  </button>
               </td>
            </tr>
         `;
      });
   }

   const tableData = document.getElementById('table-data');
   tableData.innerHTML = elements;
};

function handleCheck(event, id) {

   const storage = localStorage.getItem('todos');
   const todosData = storage ? JSON.parse(storage) : [];

   todosData.forEach((todoData, idx) => {
      if (todoData.id === id) {
         if (event.target.checked) {
            event.target.parentElement.nextElementSibling.classList.add('checked');
            event.target.parentElement.nextElementSibling.nextElementSibling.classList.add('checked');
         } else {
            event.target.parentElement.nextElementSibling.classList.remove('checked');
            event.target.parentElement.nextElementSibling.nextElementSibling.classList.remove('checked');
         };
         const updatedTodoData = { 
            id:todoData.id, 
            check: event.target.checked, 
            todo: todoData.todo, 
            at:todoData.at 
         };
         todosData.splice(idx, 1, updatedTodoData);
      };
   });

   localStorage.setItem('todos', JSON.stringify(todosData));
};
   

function showCreateForm() {
   document.getElementById('create-form').style.display = 'block';
   document.getElementById('new-btn').style.display = 'none';
};

function createTodo() {
   const todo = document.getElementById('todo-create').value;
   const time = Date.now();
   const newTodoData = { id: time, check: false, todo, at: time };
   
   const storage = localStorage.getItem('todos');
   const todosData = storage ? JSON.parse(storage) : [];

   todosData.push(newTodoData);
   localStorage.setItem('todos', JSON.stringify(todosData));

   document.getElementById('create-form').style.display = 'none';
   document.getElementById('new-btn').style.display = 'block';
   
   location.reload();
};

function showUpdateForm(id) {
   document.getElementById('update-form').style.display = 'block';
   document.getElementById('new-btn').style.display = 'none';

   const storage = localStorage.getItem('todos');
   const todosData = JSON.parse(storage);

   todosData.forEach((todoData) => {
      if (todoData.id === id) {
         document.getElementById('id-update').value = todoData.id;
         document.getElementById('todo-update').value = todoData.todo;
      };
   });
};

function updateTodo() {
   const id = parseInt(document.getElementById('id-update').value);
   const todo = document.getElementById('todo-update').value;
   const at = Date.now();
   
   const storage = localStorage.getItem('todos');
   const todosData = JSON.parse(storage);
   
   todosData.forEach((todoData, idx) => {
      if (todoData.id === id) {
         const updatedTodoData = { id, check: todoData.check, todo, at };
         todosData.splice(idx, 1, updatedTodoData);
      };
   });
   localStorage.setItem('todos', JSON.stringify(todosData));

   document.getElementById('update-form').style.display = 'none';
   document.getElementById('new-btn').style.display = 'block';

   location.reload();
};

function deleteTodo(id) {
   const confirm = window.confirm('Are you sure ?');
   
   if (confirm) {
      const storage = localStorage.getItem('todos');
      const todosData = JSON.parse(storage);

      todosData.forEach((todoData, idx) => {
         if (todoData.id === id) {
            todosData.splice(idx, 1);
         };
      });

      localStorage.setItem('todos', JSON.stringify(todosData));
      location.reload();
   };
};
