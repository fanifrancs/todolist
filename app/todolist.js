var form = document.querySelector('form');
var inputField = document.querySelector('#input');
var ul = document.querySelector('ul');
var todos;
// function to retrieve the array from local storage
function retrieveLocalTodos(storageKey) {
    if (localStorage.getItem(storageKey)) {
        var localTodos = localStorage.getItem(storageKey);
        return JSON.parse(localTodos);
    }
    return [];
}
// Function to store the array in local storage
// function storeArray(key: string, array: MyArrayType): void {
//     const jsonString = JSON.stringify(array);
//     localStorage.setItem(key, jsonString);
// }
// A wierd combination of string is used so as to create a
// unique identifier for the address that stores the todos
todos = retrieveLocalTodos('xswbvjc');
// renders a single todo to the page
function addTodo(todo) {
    var li = document.createElement('li');
    li.innerText = todo;
    ul.append(li);
}
// renders all todos from array
function renderTodos() {
    // ul.innerText = '';
    // above statement followed by a loop was used when i cleared the
    // dom and rendered every single todo in the array every time a
    // new todo is being added. Very poor : )
    if (todos.length) {
        todos.forEach(function (todo) {
            addTodo(todo);
        });
    }
}
renderTodos();
form.addEventListener('submit', function (e) {
    e.preventDefault();
    var input = inputField.value;
    var localTodos = retrieveLocalTodos('xswbvjc');
    localTodos.push(input);
    localStorage.setItem('xswbvjc', JSON.stringify(localTodos));
    addTodo(input);
    // clears the inputfield after todo is added
    inputField.value = '';
});
