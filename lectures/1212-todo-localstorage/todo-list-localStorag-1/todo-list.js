function getData(storageKey) {
   let data = [];
   const storage = localStorage.getItem(storageKey); 
   if (storage) {
      data = JSON.parse(storage);
   };
   return data;
};

function saveData(storageKey, data) {
   const jsonData = JSON.stringify(data);
   localStorage.setItem(storageKey, jsonData);
};

function readTodos() {
   const todosData = getData('todo-storage');

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
   const todosData = getData('todo-storage');

   const todoValue = document.getElementById('todo-create').value;
   const newTodo = { id: Date.now(), todo: todoValue };
   todosData.push(newTodo);

   saveData('todo-storage', todosData);
   readTodos();
};

function showUpdateForm(id) {
   const todosData = getData('todo-storage');

   document.getElementById('create-form').style.display = 'none';
   document.getElementById('update-form').style.display = 'block';

   document.getElementById('id-update').value = id;
   todosData.forEach((data) => {
      if (data.id === id) {
         document.getElementById('todo-update').value = data.todo;
      };
   });
};

function updateTodo() {
   const todosData = getData('todo-storage');

   const updatingId = parseInt(document.getElementById('id-update').value); 
   const updatedTodo = document.getElementById('todo-update').value;

   todosData.forEach((data, idx) => {
      if (data.id === updatingId) {
         const updatedTodoData = { id: updatingId, todo: updatedTodo };
         todosData.splice(idx, 1, updatedTodoData);
      };
   });

   saveData('todo-storage', todosData);

   document.getElementById('create-form').style.display = 'block';
   document.getElementById('update-form').style.display = 'none';
   readTodos();
};

function deleteTodo(id) {
   const todosData = getData('todo-storage');

   todosData.forEach((data, idx) => {
      if (data.id === id) {
         todosData.splice(idx, 1);
      };
   });
   
   saveData('todo-storage', todosData);   
   readTodos();
};