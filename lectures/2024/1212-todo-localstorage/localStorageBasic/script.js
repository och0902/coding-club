const data = [ { todo : 'test' }, { todo : 'test test'}, { todo : 'test test test' } ];

localStorage.setItem('test', 'test test test');
localStorage.setItem('storage-name', data);
// localStorage.setItem('storage-name', jsonData);
// localStorage.setItem('storage-name', JSON.stringify(data));

const storagedData = localStorage.getItem('storage-name');
// const storagedData = JSON.parse(localStorage.getItem('storage-name'));
console.log(storagedData);

// let lists = '';
// storagedData.forEach(element => {
//    lists += `<li>${element.todo}</li>`;
// });

const result = document.getElementById('result');
result.innerHTML = storagedData;
// result.innerHTML = lists;


// const jsonData = '{ "first" : "create", "second" : "read", "third" : "update", "fourth" : "delete" }';
// const objData  = JSON.parse(jsonData);
// var jsonData2 = JSON.stringify(objData);

// console.log("jsonData -> ", jsonData);
// console.log("objData -> ", objData);
// console.log("jsonData2 -> ", jsonData2);