let id_last = 0;
let todosData = [];

function readTodos() {
   let elements = '';
   for (data of todosData) {
      elements += `
         <tr>
            <td>${data.todo}</td>
            <td>
               <button onclick={showUpdateForm(${data.id})}>
                  <img src="images/icons8-edit-48.png" alt="update">
               </button>
               <button onclick={deleteTodo(${data.id})}>
                  <img src="images/icons8-trash-64.png" alt="update">
               </button>
            </td>
         </tr>
      `;
   };
   const tableData = document.getElementById('table-data');
   tableData.innerHTML = elements;
   document.getElementById('todo-create').value = '';
};

readTodos();

function createTodo() {
   const todoValue = document.getElementById('todo-create').value;
   const newTodo = { id: id_last, todo: todoValue };
   todosData.push(newTodo);
   id_last += 1 ;
   readTodos();
};

function showUpdateForm(id) {
   document.getElementById('create-form').style.display = 'none';
   document.getElementById('update-form').style.display = 'block';

   document.getElementById('id-update').value = id;

   // document.getElementById('todo-update').value = todosData[id].todo;

   todosData.forEach(function(data) {
      if (data.id === id) {
         document.getElementById('todo-update').value = data.todo;
      };
   });
};

function updateTodo() {
   const updatingId = parseInt(document.getElementById('id-update').value); 
   const updatedTodo = document.getElementById('todo-update').value;

   // todosData[updatingId].todo = updatedTodo;

   todosData.forEach(function(data, idx) {
      if (data.id === updatingId) {
         const updatedTodoData = { id: updatingId, todo: updatedTodo };
         todosData.splice(idx, 1, updatedTodoData);
      };
   });

   document.getElementById('create-form').style.display = 'block';
   document.getElementById('update-form').style.display = 'none';
   readTodos();
};

function deleteTodo(id) {
   // let idx = 0;
   // for (data of todosData) {
   //    if (data.id === id) {
   //       todosData.splice(idx, 1);
   //    };
   //    idx += 1;
   // };

   todosData.forEach(function(data, idx) {
      if (data.id === id) {
         todosData.splice(idx, 1);
      };
   });

   readTodos();
};